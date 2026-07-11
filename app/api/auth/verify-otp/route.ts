import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email aur OTP chahiye' }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User nahi mila' }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ error: 'Account pehle se verified hai' }, { status: 400 });
    }

    if (!user.otp || !user.otpExpiry) {
      return NextResponse.json({ error: 'Koi OTP nahi mila, dobara signup try karo' }, { status: 400 });
    }

    if (new Date() > user.otpExpiry) {
      return NextResponse.json({ error: 'OTP expire ho gaya hai, naya OTP mangwao' }, { status: 400 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ error: 'OTP galat hai' }, { status: 400 });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return NextResponse.json({ message: 'Account verify ho gaya! Ab login kar sakte ho.' }, { status: 200 });

  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Kuch gadbad ho gayi' }, { status: 500 });
  }
}