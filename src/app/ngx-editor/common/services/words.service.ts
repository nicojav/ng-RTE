import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const header = {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'GET',
  mode: 'no-cors'
};

@Injectable()
export class WordsService {
  constructor(
    private http: HttpClient
  ) { }

  getWords(word) {
    return this.http.get(`https://api.datamuse.com/words?ml=${word}`);
  }

}
