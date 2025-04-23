import cors from './_cors.js';
import htmlSafe from './_html-safe.js';
import nodemailer from 'nodemailer';
export default async function feature_suggestion(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { title, body } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_FROM,
      pass: process.env.GMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_FROM,
      to: process.env.GMAIL_TO,
      subject: `Clicky Latin Feature Suggestion`,
      html: `
        <div style="font-family: 'Segoe UI';">
          <h1 style="margin: 0;">${htmlSafe(title)}</h1>
          <div style="display:none;"> - </div>
          <p style="margin: 0; font-size: 1.2em;">${htmlSafe(body)}</p>
        </div>
      `,
      // Ensures the message is sent into a new thread
      references: [`<unique-id-${Date.now()}-${Math.random()}unique@gmail.com`]
    });

    res.status(200).json({ message: 'Your feature suggestion has been successfully submitted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}