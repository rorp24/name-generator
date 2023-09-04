/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const WEBSITE = 'https://un-roliste-flemmard.com/';
const API_URL = WEBSITE + 'wp-json/rorp24-api/v1/name_generator/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getNames(raceId, gender, tag = undefined) {
    const endpoint = 'get_names';
    const params = { race: raceId, gender, random: 'true' }
    if (tag) {
      params['tag'] = tag
    }

    if (raceId == 9) {
      params.gender = 3
    }
    return this.http.get(API_URL + endpoint, { params });
  }

  getSurnames(raceId) {
    const endpoint = 'get_surnames';
    return this.http.get(API_URL + endpoint, { params: { race: raceId, random: 'true' } });
  }

  getRaces() {
    const endpoint = 'get_races';
    return this.http.get(API_URL + endpoint, { params: { limit: '200', ids: '3,9,10' } });
  }
  getTitles(lang) {
    const endpoint = 'get_titles';
    return this.http.get(API_URL + endpoint, { params: { lang, random: 'true' } });
  }
}
