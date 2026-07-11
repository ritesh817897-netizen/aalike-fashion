import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendOtpEmail(toEmail: string, name: string, otp: string) {
  await transporter.sendMail({
    from: `"Aalike Fashion" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: 'Aalike Fashion — Aapka Verification Code',
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
        <div style="background: black; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: gold; margin: 0; letter-spacing: 2px;">AALIKE FASHION</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p>Hi ${name},</p>
          <p>Aapka account verify karne ke liye ye code use karo:</p>
          <div style="background: black; color: gold; font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 20px; border-radius: 8px; margin: 20px 0;">
            ${otp}
          </div>
          <p style="color: gray; font-size: 14px;">Ye code 10 minute mein expire ho jayega. Agar aapne signup nahi kiya to is email ko ignore kar do.</p>
        </div>
      </div>
    `,
  });
}

export async function sendOrderConfirmationEmail(toEmail: string, name: string, orderId: string, totalAmount: number) {
  await transporter.sendMail({
    from: `"Aalike Fashion" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: `Order Confirmed — ${orderId}`,
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
        <div style="background: black; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: gold; margin: 0; letter-spacing: 2px;">AALIKE FASHION</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p>Hi ${name},</p>
          <p>Aapka order successfully place ho gaya hai! 🎉</p>
          <p><b>Order ID:</b> ${orderId}</p>
          <p><b>Total Amount:</b> ₹${totalAmount}</p>
          <p style="color: gray; font-size: 14px;">Hum jald hi aapka order deliver kar denge.</p>
        </div>
      </div>
    `,
  });
}