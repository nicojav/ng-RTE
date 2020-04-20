import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const header = {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'GET', // GET, POST, PUT, DELETE
  mode: 'no-cors'
}

@Injectable()
export class WordsService {
  constructor(
    private http: HttpClient
  ) { }

  getWords(word) {
    console.log('word API:', word)
    return this.http.get(`https://api.datamuse.com/words?ml=${word}`);
    //return this.http.get(`https://jsonplaceholder.typicode.com/albums`);
  }

}
