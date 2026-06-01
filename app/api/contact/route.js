import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ error: 'Alle Felder sind erforderlich.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"GaLaBau Website" <${process.env.GMAIL_USER}>`,
      to: 'fyriz20@gmail.com',
      replyTo: email,
      subject: `Neue Anfrage von ${name} – GaLaBau Website`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1A1D1A;">
          <h2 style="border-bottom: 2px solid #C5A880; padding-bottom: 12px; font-weight: 300; letter-spacing: 0.05em;">
            Neue Kontaktanfrage
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; width: 80px;">Name</td>
              <td style="padding: 10px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px;">E-Mail</td>
              <td style="padding: 10px 0;">
                <a href="mailto:${email}" style="color: #607762; text-decoration: none;">${email}</a>
              </td>
            </tr>
          </table>
          <h3 style="margin-top: 24px; font-weight: 400; color: #1A1D1A;">Nachricht:</h3>
          <p style="color: #444; line-height: 1.7; white-space: pre-wrap; background: #F7F9F6; padding: 16px; border-left: 3px solid #C5A880;">${message}</p>
          <p style="margin-top: 24px; font-size: 12px; color: #aaa;">
            Gesendet über das Kontaktformular auf galabau-ojf.de – Um zu antworten, einfach auf diese E-Mail klicken.
          </p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('E-Mail-Fehler:', err);
    return Response.json({ error: 'E-Mail konnte nicht gesendet werden.' }, { status: 500 });
  }
}
