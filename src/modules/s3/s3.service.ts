import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../config/s3";
import { v4 as uuid } from "uuid";

export class S3Service {
  static async uploadFile(file: Express.Multer.File) {
    const key = `receipts/${uuid()}-${file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return {
      key,
      url,
    };
  }
}
