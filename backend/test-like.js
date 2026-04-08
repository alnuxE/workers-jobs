const http = require('http');

async function test() {
  const registerData = JSON.stringify({
    name: "tester",
    email: "test" + Date.now() + "@test.com",
    password: "password123",
    role: "Usuario"
  });

  const reqUser = http.request('http://localhost:4000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': registerData.length }
  }, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      const auth = JSON.parse(data);
      const token = auth.token;
      console.log("GOT TOKEN");

      http.get('http://localhost:4000/api/posts', { headers: { 'Authorization': 'Bearer ' + token } }, (res2) => {
        let d2 = '';
        res2.on('data', c => d2 += c);
        res2.on('end', () => {
          const posts = JSON.parse(d2);
          if (!posts.length) return console.log("NO POSTS");
          const postId = posts[0]._id;
          console.log("LIKING POST", postId);

          const reqLike = http.request(`http://localhost:4000/api/posts/${postId}/like`, {
            method: 'PUT',
            headers: { 'Authorization': 'Bearer ' + token }
          }, res3 => {
            let d3 = '';
            res3.on('data', c => d3 += c);
            res3.on('end', () => {
              console.log("LIKE RESPONSE:", res3.statusCode, d3);
            });
          });
          reqLike.end();
        });
      });
    });
  });
  reqUser.write(registerData);
  reqUser.end();
}

test();
