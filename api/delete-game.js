import cors from './_cors.js';
import { getData, setData } from './_database.js';
export default async function delete_game(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.headers.authorization !== `Key ${process.env.VALID_DELETE_KEY}`) {
    return res.status(401).json({ error: 'No Authentication or Invalid Authentication' });
  }
  const gameCode = req.query.gamecode || req.body;
  if (!gameCode) {
    return res.status(400).json({ error: 'Game code does not exist.' });
  }
  getData().then(data => {
    if (data.hasOwnProperty(gameCode)) {
      delete data[gameCode];
      setData(data)
        .then(() => {
          res.status(200).json({ message: `Game with id ${gameCode} deleted successfully` });
        })
        .catch(e => res.status(500).json({ error: e.message }));
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  });
}