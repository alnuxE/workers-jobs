const http = require('http');

const req = http.request('http://localhost:4000/api/posts', { method: 'GET' }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const posts = JSON.parse(data);
    if (!posts || posts.length === 0) return console.log("NO POSTS");
    console.log("FIRST POST: ", JSON.stringify(posts[0]));
  });
});
req.end();
