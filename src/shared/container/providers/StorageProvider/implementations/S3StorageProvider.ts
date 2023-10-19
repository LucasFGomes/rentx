import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';

import upload from '@config/upload';
import { IStorageProvider } from '../IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originName);

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${folder}/${file}`,
      Body: fileContent,
      ContentType: mime.getType(originName),
    });

    await this.client.send(command);

    await fs.promises.unlink(originName);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${folder}/${file}`,
      }),
    );
  }
}

export { S3StorageProvider };
