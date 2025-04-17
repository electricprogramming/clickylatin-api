import cors from './_cors.js';
import { getData, setData } from './_database.js';
export default async function delete_game(req, res) {
  cors(res);
  if (req.headers.Authorization !== `Key ${process.env.VALID_DELETE_KEY}`) {
    return res.status(401).json({ error: 'No Authentication or Invalid Authentication' });
  }
  const gameCode = req.query.gamecode || req.body;
  if (!gameCode) {
    return res.status(400).json({ error: 'Game code does not exist.' });
  }
  getData().then(data => {
    if (data.hasOwnProperty(id)) {
      delete data[id];
      setData(data).then(thing => {
        console.log(thing) // i legit have no clue what this is
        res.status(200).json({ message: `Game with id ${id} deleted successfully` });
      });
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  });
}