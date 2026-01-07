import { clerkClient, getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import { sellerOnboardingSchema } from "@/lib/validation/sellerSchemas";
import { checkRateLimit } from "@/lib/rateLimit";
import connectDB from "@/config/db";
import AuditLog from "@/models/AuditLog";
import { USER_ROLES } from "@/lib/constants/roles";
import { handleClerkError } from "@/lib/clerkErrorHandler";

export async function POST(request) {
    try {
        const { userId } = getAuth(request);

        if (!userId) {
            return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
        }

        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json({ success: false, message: 'Not authorized as seller' }, { status: 403 });
        }

        // Rate limiting check
        const rateLimitCheck = checkRateLimit(userId, 'seller-onboard');
        if (!rateLimitCheck.allowed) {
            const retryMinutes = Math.ceil(rateLimitCheck.retryAfter / 60000);
            return NextResponse.json({
                success: false,
                message: `Too many seller creation attempts. Please try again in ${retryMinutes} minute${retryMinutes > 1 ? 's' : ''}.`
            }, { status: 429 });
        }

        const body = await request.json();

        const validationResult = sellerOnboardingSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json({
                success: false,
                message: 'Validation failed',
                errors: validationResult.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const { username, password, firstName, lastName, email } = validationResult.data;

        const client = await clerkClient();

        const newUser = await client.users.createUser({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            emailAddress: [email],
            publicMetadata: { role: USER_ROLES.SELLER },
            skipVerification: false
        });

        // Audit logging
        try {
            await connectDB();
            await AuditLog.create({
                action: 'seller.onboard',
                actorId: userId,
                targetId: newUser.id,
                metadata: {
                    username: newUser.username,
                    email: newUser.emailAddresses[0]?.emailAddress,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName
                },
                ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
                userAgent: request.headers.get('user-agent') || 'unknown'
            });
        } catch (auditError) {
            // Log audit error but don't fail the request
            console.error('[Audit Log Error]', {
                error: auditError.message,
                actorId: userId,
                targetId: newUser.id,
                timestamp: new Date().toISOString()
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Seller onboarded successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.emailAddresses[0]?.emailAddress,
                firstName: newUser.firstName,
                lastName: newUser.lastName
            }
        });

    } catch (error) {
        // Log detailed error server-side only
        console.error('[Seller Onboard Error]', {
            userId: getAuth(request).userId,
            error: error.message,
            errorCode: error.errors?.[0]?.code,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });

        // Use centralized Clerk error handler
        const errorResponse = handleClerkError(error);

        return NextResponse.json({
            success: false,
            message: errorResponse.message
        }, { status: errorResponse.status });
    }
}
