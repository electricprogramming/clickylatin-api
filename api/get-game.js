import cors from './_cors.js';
import { getData } from './_database.js';
export default async function get_game(req, res) {
  cors(res);
  const gameCode = req.query.gamecode;
  if (!gameCode) {
    return res.status(400).json({ error: 'Game code does not exist.' });
  }
  getData()
    .then(data => {
      if (gameCode in data) {
        res.status(200).json(data[gameCode]); // Send JSON data
      } else {
        res.status(404).json({ error: 'not found' });
      }
    })
    .catch(e => res.status(500).json({ error: e.message }));
}