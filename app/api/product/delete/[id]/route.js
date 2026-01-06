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

export async function DELETE(request, { params }) {
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
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({
        success: false,
        message: 'Product not found'
      }, { status: 404 });
    }

    // Debug logging
    console.log('Delete attempt:', {
      productUserId: product.userId,
      currentUserId: userId,
      match: product.userId === userId
    });

    if (product.userId !== userId) {
      return NextResponse.json({
        success: false,
        message: 'Not authorized to delete this product',
        debug: {
          productUserId: product.userId,
          currentUserId: userId
        }
      }, { status: 403 });
    }

    // Delete images from Cloudinary
    await Promise.all(
      product.image.map(async (imageUrl) => {
        try {
          const publicId = imageUrl.split('/').slice(-1)[0].split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error('Failed to delete image from Cloudinary:', error);
        }
      })
    );

    await Product.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
      deletedId: id
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}
