const fsPromises = require("fs/promises");
const fs = require("fs");
const moment = require("moment");
const express = require("express");
const app = express();

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

app.get('/pierwsza', (_req, res) => 
    res.status(200).send("Strona główna \n")
);
app.get('/druga', (_req, res) => 
    res.status(200).json(JSON.stringify({"Banan": "banan"}))
);
app.get('/trzecia', (_req, res) => 
    res.status(200).send(epic_html)
);
app.get('/czwarta', async(_req, res) => {
    let epic_html2 = await fsPromises.readFile(__dirname + "/epic_html2.html", {encoding: 'utf8'});
    res.status(200).send(epic_html2);
});
app.get('/get_params', async(req, res) => {
    const params = JSON.stringify(req.query);

    fs.writeFile(`${__dirname}/outputs/params_${moment().format("DD.MM.YY_HH:mm:ss")}.json`, params, err => {
        if(err) return console.log(err);
    })

    res.status(200).json(JSON.stringify({ok: "ok"}));
});

app.get('*', async(req, res) => { 
    const filepath = `${__dirname}/assets/${req.path}`;
    if (!fs.existsSync(filepath))
        res.status(404).json(JSON.stringify({error: "404"}));

    let content = await fsPromises.readFile(filepath, { encoding: 'utf-8' });
    res.status(200).send(content);
})
    
app.listen(3000, () =>
    console.log("Listening on port 3000")
);
