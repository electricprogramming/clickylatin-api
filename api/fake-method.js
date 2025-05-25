import cors from './_cors.js';
import getReqOrigin from './_req-origin.js';
export default function fake_method(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  const { isBrowser } = getReqOrigin(req);

  res.status(404).send(
    (isBrowser ? '<pre wrap>' : '') +
    `Cannot ${req.method} ${req.url}` +
    (isBrowser ? '</pre>' : '')
  );
}