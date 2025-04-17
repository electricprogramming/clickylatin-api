import { getData } from './_database.js';
export default async function get_game(req, res) {
  const id = req.query.gamecode;
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'ID must be a string' });
  }
  getData().then(data => {
    if (id in data) {
      res.status(200).json(data[id]); // Send JSON data
    } else {
      res.status(404).json({ error: 'not found' });
    }
  });
}