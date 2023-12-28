import { Request, Response } from "express";
import { imgData } from "../types/types";

export default async (req: Request, res: Response) => {
  const imgData: imgData[] = [
    {
      img: "https://scontent.cdninstagram.com/v/t39.30808-6/413810791_18383319835071366_5426206652689798889_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=106&_nc_ohc=jLmHWl_bDAYAX-otb38&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzI2NTczMTE0MzMwNTA3NDQxMg%3D%3D.2-ccb7-5&oh=00_AfAOTS_4YGlya-Bz-UPPD5ZPW-vjNqppQ1qhIMqM2JPSzw&oe=658F99A1&_nc_sid=10d13b",
      title: "Brighton",
    },
    {
      img: "https://scontent.cdninstagram.com/v/t39.30808-6/402661047_18377566987071366_1193573263343206538_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=106&_nc_ohc=HP9t-HgBkPMAX_6CAds&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzI0MTk3MDM1MTc3MDQ3MDk1MQ%3D%3D.2-ccb7-5&oh=00_AfAsxgTPp0Q0GBvQaoMIzHZ413gcSK1dRNOYVBfFkl8loA&oe=658F27D1&_nc_sid=10d13b",
      title: "Manchester",
    },
    {
      img: "https://images.squarespace-cdn.com/content/v1/59523d5c4c8b031b6d9dcb5b/1645865416512-8SKTPVBKSCWDGNWU09HZ/R5JM4155-Edit-Edit.jpg?format=2500w",
      title: "chaKa_salt_lake",
    },
    {
      img: "https://photographylife.com/wp-content/uploads/2017/01/Landscape-photography-example.jpg",
    },
    {
      img: "https://static.photocdn.pt/images/articles/2018/12/03/articles/2017_8/improve_landscape_photography-1.webp",
    },
    {
      img: "https://thatwildidea.co.uk/wp-content/uploads/2021/01/nature-landscape-photography-0008-1.jpg",
    },
    {img: 'https://www.philipbedford.co.uk/wp-content/uploads/2023/09/Starling-Murmurations-over-Brighton-Pier-III-1-1000x500.webp'}
  ];

  res.send({ imgData: imgData });
};
