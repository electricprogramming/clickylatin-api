import cors from './_cors.js';
import { getData, setData } from './_database.js';
export default async function delete_game(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
}