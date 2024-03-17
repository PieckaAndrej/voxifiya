import axios from 'axios';
import { Page } from '../models/page';
import { Language } from '../models/language';
import { Sentence } from '../models/sentence';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/sentence/`,
  withCredentials: true,
});

export const postSentence = (sentence: Sentence) => {
  return instance.post<Sentence>('', {
    language: sentence.language,
    text: sentence.text
  });
};

export const getSentences = (language: string, pageCursor?: Date, pageSize: number = 20) => {
  return instance.get<Page<Sentence>>('', {
    params: {
      language,
      pageSize,
      pageCursor
    }
  });
};

export const patchSentence = (id: string, customTranslation: string | undefined) => {
  return instance.patch<Sentence>(id, {
    customTranslation
  });
};

export const deleteSentence = (id: string) => {
  return instance.delete<Sentence>(id);
};

export const getLanguages = () => {
  return instance.get<Language[]>('languages');
};
