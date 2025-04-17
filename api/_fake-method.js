import cors from './_cors.js';
export default function fake_method(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  cors(res);
  res.status(404).send(`Cannot ${req.method} ${req.url}`);
}