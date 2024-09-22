import { Request, Response } from "express";
import { imgData } from "../types/types";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

export default async (req: Request, res: Response) => {
  const baseUrl = "https://portfolio-kevintzd.s3.eu-west-2.amazonaws.com/";
  const s3Client = new S3Client({ region: "eu-west-2" });
  const listObjectCommand = new ListObjectsV2Command({
    Bucket: "portfolio-kevintzd",
    Prefix: "full/",
  });

  const pictures = await s3Client.send(listObjectCommand);

  const imgData: imgData[] =
    pictures.Contents?.filter((content) => content.Key !== "full/").map(
      (content) => ({
        img: baseUrl.concat(content.Key || ""),
        previewImg: baseUrl
          .concat("preview/")
          .concat(content.Key?.split("/")[1] || ""),
      })
    ) || [];
  console.log(imgData);
  // const imgData: imgData[] = [
  //   {
  //     img: "https://profolio-pic.s3.amazonaws.com/0H1A0041+copy.jpg",
  //     title: "Brighton",
  //   },
  //   {
  //     img: "https://profolio-pic.s3.amazonaws.com/0H1A0045+copy.jpg",
  //     title: "Manchester",
  //   },
  //   {
  //     img: "https://profolio-pic.s3.amazonaws.com/0H1A7649+copy.jpg",
  //     title: "chaKa_salt_lake",
  //   },
  //   {
  //     img: "https://photographylife.com/wp-content/uploads/2017/01/Landscape-photography-example.jpg",
  //   },
  //   {
  //     img: "https://static.photocdn.pt/images/articles/2018/12/03/articles/2017_8/improve_landscape_photography-1.webp",
  //   },
  //   {
  //     img: "https://thatwildidea.co.uk/wp-content/uploads/2021/01/nature-landscape-photography-0008-1.jpg",
  //   },
  //   {
  //     img: "https://www.philipbedford.co.uk/wp-content/uploads/2023/09/Starling-Murmurations-over-Brighton-Pier-III-1-1000x500.webp",
  //   },
  // ];

  res.send({ imgData: imgData });
};
