import cors from './_cors.js';
import { getData } from './_database.js';
export default async function get_all(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  getData()
    .then(data => {
      if (data) {
        res.status(200).json(data);
      }
    })
    .catch(e => res.status(500).json({ error: e.message }));
}