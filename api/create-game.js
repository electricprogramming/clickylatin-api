import cors from './_cors.js';
import { getData, setData } from './_database.js';
export default async function delete_game(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const newData = req.body;

  if (Array.isArray(newData)) {
    return res.status(400).json({ error: 'Payload must be an object, not an array' });
  }

  getData().then(data => {
    let newId = Math.round(Math.random() * 90000000) + 10000000;
    while (newId in data) {
      newId = Math.round(Math.random() * 90000000) + 10000000;
    }
    data[newId] = newData;
    console.log(`New game created with id ${newId} and data\n${JSON.stringify(newData, null, 2)}\nat ${getFormattedDate()}`);
    setData(data)
      .then(() => {
        res.status(200).json({ message: 'Success!', gameCode: newId })
      })
      .catch(e => res.status(500).json({ error: e.message }));
  });
}