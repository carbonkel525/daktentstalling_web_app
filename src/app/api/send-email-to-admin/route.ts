import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { subject, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "losanton280@gmail.com",
        pass: "lubk jvll jekr vhqt",
      },
    });

    const mailOptions = {
      from: "losanton280@gmail.com",
      to: "losanton280@gmail.com", // recipient email
      subject: subject || "Afhaal moment informatie",
      text: message || "Er is een nieuwe afhaling gepland!",
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "E-mail verzonden!" });
  } catch (error) {
    console.error("E-mail verzenden mislukt: ", error);
    return NextResponse.json({ error: "E-mail verzenden mislukt" });
  }
}
