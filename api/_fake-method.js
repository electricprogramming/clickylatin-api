import cors from './_cors.js';
export default function fake_method(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  res.status(404).send(`Cannot ${req.method} ${req.url}`);
}