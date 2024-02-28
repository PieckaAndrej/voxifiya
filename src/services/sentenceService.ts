import axios from 'axios';
import { environment } from '../environment';
import { Page } from '../models/page';
import { Language } from '../models/language';
import { Sentence } from '../models/sentence';

const instance = axios.create({
  baseURL: `${environment.backendUrl}/api/sentence/`,
  withCredentials: true,
});

export const getSentences = (language: string, pageCursor?: Date, pageSize: number = 20) => {
  return instance.get<Page<Sentence>>('', {
    params: {
      language,
      pageSize,
      pageCursor
    }
  });
};

export const getLanguages = () => {
  return instance.get<Language[]>('languages');
};
