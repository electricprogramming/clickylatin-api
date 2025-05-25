import cors from './_cors.js';

export default async function detect_origin(req, res) {
  // Enable CORS
  cors(res);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const accept = req.headers.accept || '';
  const fetchMode = req.headers['sec-fetch-mode'];
  const fetchDest = req.headers['sec-fetch-dest'];

  const isBrowserNavigation =
    accept.includes('text/html') ||
    (fetchMode === 'navigate' && fetchDest === 'document');

  if (isBrowserNavigation) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>
          <h1>Hello from the browser tab!</h1>
          <p>This was served as HTML based on the request headers.</p>
        </body>
      </html>
    `);
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      message: 'Hello from fetch() or API call!',
      detectedFrom: {
        accept,
        fetchMode,
        fetchDest
      }
    });
  }
}
