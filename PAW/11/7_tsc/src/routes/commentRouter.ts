import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// CREATE ///////////////////////////////////////////////////////////////////////////

router.post('/', async(req: Request, res: Response): Promise<any> => {
    let missing = new Array();

    const { content, postId } = req.body;
    if( !postId ) missing.push('postId');
    if( !content ) missing.push('content');

    if(missing.length != 0) return res.status(400).json({ messages: "Required fields missing: " + missing.join(' ') })
    
    try {
        await prisma.comment.create({ data: { content, postId: Number.parseInt(postId) }});
        res.status(200).json({ message: "Successfully added a new comment" });
    } 
    catch(err) {
        res.status(500).json({ message: "Encountered an error while creating a new comment. " + err })
    }
});

// READ /////////////////////////////////////////////////////////////////////////////

router.get('/', async(_req: Request, res: Response) => {
    const comments = await prisma.comment.findMany();
    res.status(200).json(comments);
});

router.get("/:id", async(req: Request, res: Response): Promise<any> => {
    const id = parseInt(req.params.id);
    if( !Number.isInteger(id) ) return res.status(400).json({ message: "The id must be of type Integer" });

    const comment = await prisma.comment.findUnique({ where: { id } });
    res.status(200).json(comment);
})

router.get("/wpis/:postId", async(req: Request, res: Response): Promise<any> => {
    const postId = parseInt(req.params.postId);
    if( !Number.isInteger(postId) ) return res.status(400).json({ message: "The id of post must be of type Integer" });

    const comments = await prisma.comment.findMany({ where: { postId } });
    res.status(200).json(comments);
})

// UPDATE ///////////////////////////////////////////////////////////////////////////

router.put("/:id", async(req: Request, res: Response): Promise<any> => {
    const id = parseInt(req.params.id);
    if( !Number.isInteger(id) ) return res.status(400).json({ message: "The id must be of type Integer" });    

    const { content } = req.body;
    if( !content ) return res.status(400).json({"message": "Missing required field content"});
    
    try {
        await prisma.comment.update({ where: { id }, data: { content } });
        res.status(200).json({ message: "Successfully updated the comment of id " + id })
    }
    catch(err) {
        res.status(400).json({ message: `Encountered an error while updating comment of id ${id}. ${err}` });
    }
});

// DELETE //////////////////////////////////////////////////////////////////////////

router.delete("/:id", async(req: Request, res: Response): Promise<any> => {
    const id = parseInt(req.params.id);
    if( !Number.isInteger(id) ) return res.status(400).json({ message: "The id must be of type Integer" });
    
    try {
        await prisma.comment.delete({ where: { id } });
        res.status(200).json({ message: "Successfully deleted the comment of id " + id })
    }
    catch(err) {
        res.status(500).json({ message: `Encountered an error while deleting comment of id ${id}. ${err}` })
    }
});

export default router;
