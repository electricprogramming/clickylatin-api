import cors from './_cors.js';
export default async function current_deployment(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const PROJECT_NAME = 'clickylatin';
  const TEAM_ID = 'team_UdiGAc5Yh2R4JswpV4P7hlsa';
  const reqTimestamp = req.query.timestamp || Date.now();
  const target = req.query.target || (req.headers.origin || '').includes('dev') ? 'preview' : 'production';
  fetch(`https://api.vercel.com/v6/now/deployments?teamId=${TEAM_ID}&projectId=${PROJECT_NAME}&target=${target}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_API_KEY}`
    }
  })
    .then(response => response.json())
    .then(data => data.deployments.find(deployment => reqTimestamp - deployment.ready >= 5000))
    .then(deployment => res.status(200).json(deployment))
    .catch(error => res.status(500).json({ error: error.message }));
}