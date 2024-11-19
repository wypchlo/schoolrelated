import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// CREATE //////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/', async(req: Request, res: Response): Promise<any> => {
    const { title, content, description } = req.body;
    let missing = new Array();

    if(!title) missing.push("title");
    if(!content) missing.push("content");

    if(missing.length != 0) return res.status(400).json({ messages: "Required fields missing: " + missing.join(' ') })

    try {
        await prisma.post.create({ data: { title, content, description: description || '' } });
        res.status(200).json({ message: "Successfully added a new post" });
    }
    catch(err) {
        res.status(400).json({ message: "Error while adding a new post: " + err });
    }
});

// READ //////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/', async(_req: Request, res: Response) => {
    const result = await prisma.post.findMany();
    res.json(result);
});

router.get("/:id", async(req: Request, res: Response): Promise<any> => {
    const id = parseInt(req.params.id);
    if(!Number.isInteger(id)) return res.status(400).json({ message: "The id must be of type Integer" });

    const result = await prisma.post.findUnique({ where: { id } });
    res.json(result);
});

// UPDATE //////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.put("/:id", async(req: Request, res: Response): Promise<any> => {
    const id = parseInt(req.params.id);
    if(!Number.isInteger(id)) return res.status(400).json({ message: "The id must be of type Integer" });

    const { title, content, description } = req.body;
    let missing = new Array();

    if(!title) missing.push("title");
    if(!content) missing.push("content");

    if(missing.length != 0) return res.status(400).json({ messages: "Required fields missing: " + missing.join(' ') })

    try {
        await prisma.post.update({ where: { id }, data: { title, content, description: description || '' } });
        res.status(200).json({ message: "Successfully updated the post of id " + id });
    }
    catch(err) {
        res.status(400).json({ message: `Encountered an error while updating post of id ${id}. ${err}` });
    }
});

router.patch("/:id", async(req: Request, res: Response): Promise<any> => {
    const id = parseInt(req.params.id);
    if(!Number.isInteger(id)) return res.status(400).json({ message: "The id must be of type Integer" });

    const { title, content, description } = req.body;

    try {
        await prisma.post.update({ where: { id }, data: { title, content, description } });
        res.status(200).json({ message: "Successfully updated the post of id " + id });
    }
    catch(err) {
        res.status(400).json({ message: `Encountered an error while updating post of id ${id}. ${err}` });
    }
});

// DELETE //////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.delete("/:id", async(req: Request, res: Response): Promise<any> => {
    const id = parseInt(req.params.id);
    if(!Number.isInteger(id)) return res.status(400).json({ message: "The id must be of type Integer" });
    
    try {
        await prisma.post.delete({ where: { id } });
        res.status(200).json({ message: "Successfully deleted post of id " + id });
    }
    catch(err) {
        res.status(500).json({ message: `Encountered an error while deleting post of id ${id}. ${err}` }) 
    }
});

export default router;
