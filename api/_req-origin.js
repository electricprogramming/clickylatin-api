export default function getReqOrigin(req) {
  const accept = req.headers.accept || '';
  const fetchMode = req.headers['sec-fetch-mode'];
  const fetchDest = req.headers['sec-fetch-dest'];

  const isBrowser =
    accept.includes('text/html') ||
    (fetchMode === 'navigate' && fetchDest === 'document');

  const detectedFrom = {
    accept,
    fetchMode,
    fetchDest
  }

  return {
    isBrowser,
    detectedFrom
  }
}