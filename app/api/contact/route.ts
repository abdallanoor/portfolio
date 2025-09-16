import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    await resend.emails.send({
      from: "Portfolio@resend.dev",
      to: "abdallaahnoor@gmail.com",
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/> ${message}</p>
      `,
    });

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    return NextResponse.json({ status: "error", error }, { status: 500 });
  }
}
