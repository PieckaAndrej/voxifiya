export interface Sentence {
  id?: string;
  customTranslation?: boolean;
  translatedText?: string;
  text: string;
  createdDate?: Date;
  language: string;
}