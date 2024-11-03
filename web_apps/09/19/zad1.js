const http = require("http");
const fs = require("fs");
const url = require("url");
const moment = require("moment");

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

fs
fs.readFile(__dirname + '/epic_html2.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  epic_html2 = data;
});

const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url);
    const pathname = urlObj.pathname;

    switch (pathname) {
        case  '/pierwsza': 
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end("Strona główna\n");
            break;
        case '/druga':
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({"Banan": "banan"}));
         case '/trzecia':
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.write(epic_html);
            res.end();
            break;
        case '/czwarta':
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(epic_html2);
            break;
        case '/get_params':
            const search = urlObj.search;
            const getParamsArr = search.substring(1, search.length).split("&");
            const getParamsObj = {};
    
            for(const param of getParamsArr) {
                const paramSplit = param.split("=");
                getParamsObj[paramSplit[0]] = paramSplit[1];
            }

            const fileName = __dirname + "/outputs/params_" + moment().format("DD.MM.YY_HH:mm:ss") + ".json";
            const content = JSON.stringify(getParamsObj);
            fs.writeFile(fileName, content, err => {
                if(err) console.log(err);
            })

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ok: "ok"}));
            break;
    }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
