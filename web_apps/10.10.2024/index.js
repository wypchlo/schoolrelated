const express = require("express");
const app = express();

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/static/index.html`);
});

app.get('/o-nas', (req, res) => {
    res.send("banan");
});

app.get('/front', (req, res) => {
    res.send("banan");
});

app.get('/kontakt', (req, res) => {
    res.send("banan");
});

app.listen(3000, () => {
    console.log("server listening on port 3000")
})
