import cors from './_cors.js';
export default function fake_method(req, res) {
  cors(res);
  res.status(404).send(`Cannot ${req.method} ${req.url}`);
}