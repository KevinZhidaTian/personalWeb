import { Request, Response } from "express";
export default async (req: Request, res: Response) => {
    res.send({
        email: 'kevintzd@outlook.com',
        phone: `+44 07594739847`,
    });
    return {
        email: 'kevintzd@outlook.com',
        phone: `+44 07594739847`,
    }
}