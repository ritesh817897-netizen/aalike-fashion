import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { sendOtpEmail } from '@/lib/mailer';

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { name, email, phone, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email aur password chahiye' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });

    // Agar user pehle se hai aur verified hai -> error
    if (existingUser && existingUser.isVerified) {
      return NextResponse.json({ error: 'Email pehle se registered hai' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minute

    let user;

    if (existingUser && !existingUser.isVerified) {
      // Pehle se ek unverified account tha -> usi ko update kar do (naya OTP bhej do)
      existingUser.name = name;
      existingUser.phone = phone || '';
      existingUser.password = hashedPassword;
      existingUser.otp = otp;
      existingUser.otpExpiry = otpExpiry;
      await existingUser.save();
      user = existingUser;
    } else {
      // Bilkul naya account
      user = await User.create({
        name,
        email,
        phone: phone || '',
        password: hashedPassword,
        role: 'user',
        isVerified: false,
        otp,
        otpExpiry,
      });
    }

    try {
      await sendOtpEmail(email, name, otp);
    } catch (mailErr) {
      console.error('OTP email send error:', mailErr);
      return NextResponse.json({ error: 'OTP email nahi bhej paye. Thodi der baad try karo.' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'OTP aapke email par bhej diya gaya hai',
      email: user.email,
    }, { status: 201 });

  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Kuch gadbad ho gayi' }, { status: 500 });
  }
}