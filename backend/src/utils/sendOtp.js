import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import Otp from "../models/Otp.js";

// Helper to handle OTP generation, storage, and email delivery
const sendOtp = async (email) => {
  console.log(`Starting OTP process for: ${email}`);

  try {
    // Refresh the OTP for this email
    await Otp.deleteMany({ email });
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otpCode, salt);
    await Otp.create({ email, otp: hashedOtp });
    console.log("OTP code saved to DB.");

    // Configure the mail transport (Gmail SMTP)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS?.trim(),
      }
    });

    // Check if we can actually talk to the mail server
    console.log("Verifying SMTP connection...");
    await transporter.verify();
    console.log("SMTP is ready.");

    const mailOptions = {
      from: `"CreatorConnect" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Verification Code - CreatorConnect",
      html: `
        <div style="font-family: 'Courier New', Courier, monospace; border: 2px solid black; padding: 20px; max-width: 500px;">
          <h2 style="border-bottom: 2px solid black;">CREATOR CONNECT</h2>
          <p>YOUR VERIFICATION CODE IS:</p>
          <p style="font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">${otpCode}</p>
          <p>THIS CODE WILL EXPIRE IN 5 MINUTES.</p>
        </div>
      `,
    };

    // Send the actual email
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully. ID:", info.messageId);

    return otpCode;

  } catch (error) {
    console.error("Failed to deliver OTP email.");
    console.error({
      message: error.message,
      code: error.code,
      response: error.response,
    });
    
    // Quick config check for debugging
    console.log("Current user:", process.env.EMAIL_USER);

    return null;
  }
};

export default sendOtp;