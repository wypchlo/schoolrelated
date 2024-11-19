import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// CREATE ///////////////////////////////////////////////////////////////////////////

router.post('/', async(req: Request, res: Response): Promise<any> => {
    const { category, description } = req.body;
    if( !category ) return res.status(400).json({ message: "Missing required field content" });
     
    try {
        await prisma.category.create({ data: { category, description }});
        res.status(200).json({ message: "Successfully added a new category" });
    } 
    catch(err) {
        res.status(500).json({ message: "Encountered an error while creating a new category. " + err })
    }
});

// READ /////////////////////////////////////////////////////////////////////////////

router.get('/', async(_req: Request, res: Response) => {
    const category = await prisma.category.findMany();
    res.status(200).json(category);
});

router.get("/:id", async(req: Request, res: Response): Promise<any> => {
    const id = parseInt(req.params.id);
    if( !Number.isInteger(id) ) return res.status(400).json({ message: "The id must be of type Integer" });

    const category = await prisma.category.findUnique({ where: { id } });
    res.status(200).json(category);
})

// UPDATE ///////////////////////////////////////////////////////////////////////////

router.put("/:id", async(req: Request, res: Response): Promise<any> => {
    const id = parseInt(req.params.id);
    if( !Number.isInteger(id) ) return res.status(400).json({ message: "The id must be of type Integer" });    

    const { category, description } = req.body;
    if( !category ) return res.status(400).json({"message": "Missing required field content"});
    
    try {
        await prisma.category.update({ where: { id }, data: { category, description: description || "" } });
        res.status(200).json({ message: "Successfully updated the category of id " + id })
    }
    catch(err) {
        res.status(400).json({ message: `Encountered an error while updating category of id ${id}. ${err}` });
    }
});

router.patch("/:id", async(req: Request, res: Response): Promise<any> => {
    const id = parseInt(req.params.id);
    if( !Number.isInteger(id) ) return res.status(400).json({ message: "The id must be of type Integer" });    

    const { category, description } = req.body;
    
    try {
        await prisma.category.update({ where: { id }, data: { category, description } });
        res.status(200).json({ message: "Successfully updated the category of id " + id })
    }
    catch(err) {
        res.status(400).json({ message: `Encountered an error while updating category of id ${id}. ${err}` });
    }
});

// DELETE //////////////////////////////////////////////////////////////////////////

router.delete("/:id", async(req: Request, res: Response): Promise<any> => {
    const id = parseInt(req.params.id);
    if( !Number.isInteger(id) ) return res.status(400).json({ message: "The id must be of type Integer" });
    
    try {
        await prisma.category.delete({ where: { id } });
        res.status(200).json({ message: "Successfully deleted the category of id " + id })
    }
    catch(err) {
        res.status(500).json({ message: `Encountered an error while deleting category of id ${id}. ${err}` })
    }
});

export default router;
