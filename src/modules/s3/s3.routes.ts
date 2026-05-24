import express from "express";
import multer from "multer";
import { S3Controller } from "./s3.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/upload",
  authenticate,
  upload.single("file"),
  S3Controller.upload,
);

export default router;
