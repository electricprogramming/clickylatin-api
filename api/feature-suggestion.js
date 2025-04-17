export default async function feature_suggestion(req, res) {
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
      subject: `Clicky Latin Feature Suggestion - ${title}`,
      html: `
        <h1>${htmlSafe(title)}</h1><div style="display:none;"> - </div>
        <p>${htmlSafe(body)}</p>
      `,
      references: [`<unique-id-${Date.now()}-${Math.random()}unique@gmail.com`]
    });

    res.status(200).json({ message: 'Email sent!' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}