import { Injectable } from '@nestjs/common';
import { pdfToPic } from 'src/utils/pdf-text.utils';

@Injectable()
export class PdfTextService {
  async extractText(file: Buffer): Promise<string> {
    const questionsImage = await pdfToPic(file);
    const extractedText = 'nothing';
    return extractedText;
  }

  async findSolution(questions: string): Promise<string> {
    const answer = questions;
    return answer;
  }
}
