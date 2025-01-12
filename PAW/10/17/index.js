import express from "express";
import fs from "fs/promises";

const __dirname = import.meta.dirname;

const app = express();

const footer_header = await fs.readFile(`${__dirname}/static/footer_header.html`, 'utf8');

app.use(express.urlencoded({ extended: true })) 

app.get('/', async(_req, res) => {
    const main = await fs.readFile(`${__dirname}/static/main.html`, 'utf8');
    res.send(main + footer_header);
});

app.get('/o-nas', async(_req, res) => {
    const about_us = await fs.readFile(`${__dirname}/static/about_us.html`, 'utf8')
    res.send(about_us + footer_header);
});

app.get('/oferta', async(_req, res) => {
    const offer = await fs.readFile(`${__dirname}/static/offer.html`, 'utf8')
    res.send(offer + footer_header);
});

app.get('/kontakt', async(_req, res) => {
    const contact_us = await fs.readFile(`${__dirname}/static/contact_us.html`, 'utf8')
    res.send(contact_us + footer_header);
});

app.post('/kontakt', async(req, res) => {
    console.log(req.body);
    const main = await fs.readFile(`${__dirname}/static/main.html`, 'utf8');
    res.send(main + footer_header);   
})

app.use(express.static('static')).listen(3000, () => {
    console.log("Listening on port 3000");
});
