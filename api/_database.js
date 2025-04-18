export async function getData() {
  return new Promise((resolve, reject) => {
    fetch('https://api.github.com/repos/electricprogramming/clickylatin-database/contents/data.json', {
      headers: {
        'Authorization': `token ${process.env.GITHUB_API_KEY}`
      }
    })
      .then(res => res.json())
      .then(file => decodeURIComponent(escape(atob(file.content))))
      .then(json => JSON.parse(json))
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

export async function setData(newData) {
  return new Promise((resolve, reject) => {
    fetch('https://api.github.com/repos/electricprogramming/clickylatin-database/contents/data.json', {
      headers: {
        'Authorization': `token ${process.env.GITHUB_API_KEY}`
      }
    })
      .then(res => res.json())
      .then(data => fetch('https://api.github.com/repos/electricprogramming/clickylatin-database/contents/data.json', {
        method: 'PUT',
        headers: {
          'Authorization': `token ${process.env.GITHUB_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'remotely update data.json',
          sha: data.sha,
          content: btoa(unescape(encodeURIComponent(JSON.stringify(newData, null, '\t')))) // Use tabs to prettify while saving bytes compared to using spaces
        })
      }))
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}