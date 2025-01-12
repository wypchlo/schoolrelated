import express from "express";
import fs from "fs/promises";
import mysql from "mysql";
import _ from "lodash";

const __dirname = import.meta.dirname;

const app = express();

const footer_header = await fs.readFile(`${__dirname}/static/footer_header.html`, 'utf8');

let con = mysql.createConnection({host: "localhost", user: "root", password: ""});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected with mysql");
    con.query("CREATE DATABASE IF NOT EXISTS 24_10_2024_MW;", (err) => {
        if (err) throw err;
        console.log("Database created");
    });
    con.query("USE 24_10_2024_MW;", (err) => {
        if (err) throw err;
        console.log("Using database");
    });
    con.query(`
        CREATE TABLE IF NOT EXISTS messages 
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            surname VARCHAR(255),
            email VARCHAR(255),
            message LONGTEXT
        );`, (err) => {
        if (err) throw err;
        console.log("Table created");
    });
});

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
    const {name, surname, email, message} = req.body;

    con.query("INSERT INTO messages (name, surname, email, message) VALUES ?", [[[name, surname, email, message]]], (err, _result) => {
        if (err) throw err;
        console.log("Inserted data");
    });
    const main = await fs.readFile(`${__dirname}/static/main.html`, 'utf8');
    res.send(main + footer_header);   
})

app.get('/api/contact-messages', async(_req, res) => {
     con.query("SELECT * FROM messages", (err, result) => {
        if (err) throw err;
         res.json(result);
     });
});

app.get('/api/contact-messages/:id', async(req, res) => {
    con.query(`SELECT * FROM messages WHERE id = ?`, req.params.id, (err, result) => {
        if (err || _.isEmpty(result)) return res.status(404).json({"error": 404});
        res.json(result);
    });
});

app.use(express.static('static')).listen(3000, () => {
    console.log("Listening on port 3000");
});
