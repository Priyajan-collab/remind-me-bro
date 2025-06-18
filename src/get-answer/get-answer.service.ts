@Injectable()
export class GetAnswerService {
  //TODO:inject service from pdf-pic
  constructor() {}

  async convertImagesToText(file: Buffer): Promise<string[]> {
    const text: string[] = ['something'];
    return text;
  }

  async getAnswer(text: string[]): Promise<string[]> {
    const answers: string[] = ['answer'];
    return answers;
  }
}
