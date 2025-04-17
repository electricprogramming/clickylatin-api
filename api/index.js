import cors from './_cors.js';
export default function index(req, res) {
  cors(res);
  res.send(`Welcome to the new Clicky Latin API! To get the data of a game, GET /get-game. To create a game, POST /create-game. To get all games, GET /all. To delete a game, GET or POST /delete with authentication. To get the current deployment, GET /current-deployment. To get the message of the current deployment, GET /current-deployment-msg. To suggest a feature, POST /feature-suggestion`)
}