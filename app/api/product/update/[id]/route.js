import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PATCH(request, { params }) {
  try {
    const { userId } = getAuth(request);
    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json({
        success: false,
        message: 'Not authorized as seller'
      }, { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return NextResponse.json({
        success: false,
        message: 'Product not found'
      }, { status: 404 });
    }

    // Debug logging
    console.log('Update attempt:', {
      productUserId: existingProduct.userId,
      currentUserId: userId,
      match: existingProduct.userId === userId
    });

    if (existingProduct.userId !== userId) {
      return NextResponse.json({
        success: false,
        message: 'Not authorized to update this product',
        debug: {
          productUserId: existingProduct.userId,
          currentUserId: userId
        }
      }, { status: 403 });
    }

    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const category = formData.get('category');
    const price = formData.get('price');
    const offerPrice = formData.get('offerPrice');
    const newFiles = formData.getAll('images');

    let imageUrls = existingProduct.image;

    // If new images uploaded, replace old ones
    if (newFiles && newFiles.length > 0 && newFiles[0].size > 0) {
      // Delete old images from Cloudinary
      await Promise.all(
        existingProduct.image.map(async (imageUrl) => {
          try {
            const publicId = imageUrl.split('/').slice(-1)[0].split('.')[0];
            await cloudinary.uploader.destroy(publicId);
          } catch (error) {
            console.error('Failed to delete image:', error);
          }
        })
      );

      // Upload new images
      const uploadResults = await Promise.all(
        newFiles.map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { resource_type: 'auto' },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            stream.end(buffer);
          });
        })
      );

      imageUrls = uploadResults.map(result => result.secure_url);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        category,
        price: Number(price),
        offerPrice: Number(offerPrice),
        image: imageUrls,
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}
