import cors from './_cors.js';
import htmlSafe from './_html-safe.js';
import nodemailer from 'nodemailer';
export default async function bug_report(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  try {
  const { title, body, device } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_FROM,
      pass: process.env.GMAIL_PASS
    }
  });

    await transporter.sendMail({
      from: process.env.GMAIL_FROM,
      to: process.env.GMAIL_TO,
      subject: `Clicky Latin Bug Report`,
      html: `
        <div style="font-family: 'Segoe UI';">
          <h1 style="margin: 0;">${htmlSafe(title)}</h1>
          <div style="display:none;"> - </div>
          <br>
          <p style="margin: 0; font-size: 1.2em;">${htmlSafe(body)}</p>
          <br>
          <table style="width: 85%; border-collapse: collapse; margin: auto; font-family: 'Segoe UI';">
            <caption style="caption-side: top; font-size: 1.5em; font-weight: bold; padding: 0.2em;">
              Device Info
            </caption>
            <colgroup>
              <col id="a" style="width: 30%; background: #333;">
              <col id="b" style="width: 70%;">
            </colgroup>
            <tbody>
              <tr>
                <td style="border: 1px solid #999; padding: 0.75em; color: #fff; font-weight: bold;">Device type</td>
                <td style="border: 1px solid #999; padding: 0.75em;">${htmlSafe(device.type)}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #999; padding: 0.75em; color: #fff; font-weight: bold;">Device OS</td>
                <td style="border: 1px solid #999; padding: 0.75em;">${htmlSafe(device.OS)}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #999; padding: 0.75em; color: #fff; font-weight: bold;">Device manufacturer</td>
                <td style="border: 1px solid #999; padding: 0.75em;">${htmlSafe(device.manufacturer)}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #999; padding: 0.75em; color: #fff; font-weight: bold;">Browser</td>
                <td style="border: 1px solid #999; padding: 0.75em;">${htmlSafe(device.browser)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      // Ensures the message is sent into a new thread
      references: [`<unique-id-${Date.now()}-${Math.random()}unique@gmail.com`]
    });

    res.status(200).json({ message: 'Email sent!' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}