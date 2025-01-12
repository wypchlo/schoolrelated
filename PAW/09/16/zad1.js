let http = require('http');
let fs = require('fs');

let epic_html = `
    <!DOCTYPE html>
    <html>
        <head>
            <title> most epic html evr </title>
        </head>
        <body>
            a
        </body>
    </html>
`;

let epic_html2;

fs.readFile(__dirname + '/epic_html2.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  epic_html2 = data;
});

const server = http.createServer((req, res) => {
    let path = req.url;
    
    switch (path) {
        case  '/pierwsza': 
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end("Strona główna\n");
            break;
        case '/druga':
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.write(JSON.stringify({"Banan": "banan"}));
            res.end();
         case '/trzecia':
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.write(epic_html);
            res.end();
            break;
        case '/czwarta':
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.write(epic_html2);
            res.end();
            break;
    }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
