import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import path from "path";

class UploadService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    const {
      AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY,
      AWS_REGION,
      S3_BUCKET_NAME,
    } = process.env;
    this.s3Client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID!,
        secretAccessKey: AWS_SECRET_ACCESS_KEY!,
      },
    });
    this.bucketName = S3_BUCKET_NAME!;
  }

  private async uploadToS3(
    file: Express.Multer.File,
    folder: string
  ): Promise<string> {
    const fileName = `${folder}/${uuidv4()}${path.extname(file.originalname)}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      // ACL: "public-read",
    });
    await this.s3Client.send(command);

    return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  }

  public uploadUserProfilePhoto(file: Express.Multer.File) {
    return this.uploadToS3(file, "profile_photos");
  }

  public uploadRoomImage(file: Express.Multer.File) {
    return this.uploadToS3(file, "room_images");
  }

  public uploadHotelImage(file: Express.Multer.File) {
    return this.uploadToS3(file, "hotel_images");
  }
}
export default UploadService;
