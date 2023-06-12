import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';

@Injectable()
export class FileService {
  async uploadFiles(files: any, productId: string): Promise<string[]> {
    const fileNames = [];
    for (const file of files) {
      const fileName = `${productId}_${file.originalname}`;
      fileNames.push(fileName);
      const writeStream = createWriteStream(`./assets/imageItems/${fileName}`);
      writeStream.write(file.buffer);
    }
    return fileNames;
  }
}
