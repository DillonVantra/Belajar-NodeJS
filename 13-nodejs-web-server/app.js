const http = require("http");

const cl = (cl) => console.log(cl);

const port = 3000;

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const url = req.url;
    if (url === "/about") {
      res.write("<h2>Halaman About</h2>");
      res.end();
    } else if (url === "/contact") {
      res.write("<h2>Halaman Contact</h2>");
      res.end();
    } else {
      res.write("<h2>Hello World!</h2>");
      res.end();
    }
  })
  .listen(port, () => {
    cl(`server is listening on port ${port}...`);
  });
