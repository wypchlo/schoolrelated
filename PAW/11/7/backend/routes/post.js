import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = PrismaClient();
const router = express.Router();

router.get('/', async(_req, res) => {
    const wpisy = await prisma.post.findMany();
    res.json(wpisy);
});

router.post('/', async(req, res) => {
    const {title, content, authorId} = req.body;
    if(!title || !authorId) {
        let missing = new Array();
        if(!title) missing.push("title");
        if(!authorId) missing.push("authorId"); 

        res.status(400).json({"error_message": 'Nie podano wymaganych danych: ' + missing.join(', ')});
    }
    
    try {
        await prisma.post.create({
            data: {
                title: title,
                content: content,
                authorId: parseInt(authorId)
            }
        }) 
        res.status(200).json({"message": "successfully added a new post"});
    }
    catch (error) {
        console.error(`Encountered an erro while creating a new post: \n` + error);
        res.status(400).json({"error": 400});
    }
});

export default router;
