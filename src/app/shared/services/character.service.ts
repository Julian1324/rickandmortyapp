import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Character } from '../interfaces/character.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  searchCharacter(type = '', query = '', page = 1) {
    return this.http.get<Character[]>(`${environment.apiURL}/character/?${type}=${query}&page=${page}`);
  }

  searchEpisode(episode: string) {
    return this.http.get<Character[]>(`${episode}`);
  }

  getDetails(id: number) {
    return this.http.get<Character>(`${environment.apiURL}/character/${id}`);
  }
}
