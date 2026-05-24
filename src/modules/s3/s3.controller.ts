import { Request, Response } from "express";
import { S3Service } from "./s3.service";

export class S3Controller {
  static async upload(req: Request, res: Response) {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "No file provided" });
      }

      const result = await S3Service.uploadFile(file);

      return res.json({
        message: "File uploaded successfully",
        ...result,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Upload failed" });
    }
  }
}
