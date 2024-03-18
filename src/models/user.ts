import { Language } from './language';

export interface User {
  id: string
  username: string;
  email: string;
  defaultLanguage?: Language;
}