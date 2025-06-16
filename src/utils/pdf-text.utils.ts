import { fromBuffer } from 'pdf2pic';
import { BufferResponse } from 'pdf2pic/dist/types/convertResponse';

export async function pdfToPic(file: Buffer): Promise<BufferResponse[]> {
  try {
    const options = {
      density: 100,
      saveFilename: 'untitled',
      format: 'png',
      width: 600,
      height: 600,
    };

    const converter = fromBuffer(file, options);

    const convertedPicture = await converter.bulk(-1, {
      responseType: 'buffer',
    });
    if (!convertedPicture) {
      throw new Error('failed to convert pdf to image');
    }
    return convertedPicture;
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
}
