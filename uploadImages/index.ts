import sharp from "sharp";
import * as fs from "fs";
import path from "path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

(async () => {
  const s3Client = new S3Client({ region: "eu-west-2" });
  const basePath = path.join(__dirname, "pictures");
  const files = fs.readdirSync(basePath);
  for (const file of files) {
    const filePath = path.join(basePath, file);
    const original = await fs.readFileSync(filePath);
    const compressed = await sharp(filePath).jpeg({ quality: 20 }).toBuffer();
    await fs.writeFileSync(`.//preview//${file}.jpeg`, compressed);

    const uploadPreviewCommand = new PutObjectCommand({
      Bucket: "portfolio-kevintzd",
      Body: compressed,
      Key: `preview/${file}`,
    });

    const uploadOriginalCommand = new PutObjectCommand({
      Bucket: "portfolio-kevintzd",
      Body: original,
      Key: `full/${file}`,
    });
    await s3Client.send(uploadPreviewCommand);
    await s3Client.send(uploadOriginalCommand);
  }
})();
