import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfTextService {
  async extractText(file: Buffer): Promise<string> {
    const extractedText = 'nothing';
    return extractedText;
  }

  async findSolution(questions: string): Promise<string> {
    const answer = 'nothing';
    return answer;
  }
}
