const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  const url = req.url;
  const method = req.method;
  console.log("URL is ", url);
  console.log("method is ", method);
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>My first page</title></head>");
    res.write(
      '<body><form method="POST" action="/message"><input name="message" type="text"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end(); // use return to exit out of the function
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>hello from my nodejs server</h1></body>");
  res.write("</html>");
  res.end();
  // process.exit();
});

server.listen(3000);
