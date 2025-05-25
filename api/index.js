import cors from './_cors.js';
import getReqOrigin from './_req-origin.js';
export default function index(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  const { isBrowser } = getReqOrigin(req);
  
  res.status(200).send((isBrowser ? '<pre wrap>' : '') +
`Welcome to the new Clicky Latin API!
To get the data of a game, GET /get-game.
To get all games, GET /all.
To create a game, POST /create.
To delete a game, GET or DELETE /delete with authentication.
To get the current deployment, GET /current-deployment.
To get the message of the current deployment, GET /current-deployment-msg.
To suggest a new feature, POST /feature-suggestion.
To report a bug, POST /report-a-bug.` +
(isBrowser ? '</pre>' : ''));
}