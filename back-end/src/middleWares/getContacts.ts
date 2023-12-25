import { Request, Response } from "express";
export default async (req: Request, res: Response) => {
    res.send({
        email: 'kevintzd@outlook.com',
        phone: `+44 07594739847`,
        linkedIn: 'https://www.linkedin.com/in/kevin-tian-6257b8200/',
        instagram: 'https://www.instagram.com/kevin_tzd/',
    });
}