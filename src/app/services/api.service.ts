/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { domain } from '../helper/domain.helper';

const API_URL = domain + 'wp-json/rorp24-api/v1/name_generator/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getNames(raceId, gender) {
    const endpoint = 'get_names';
    const params = { race_id: raceId, gender, random: 'true' }

    if (raceId == 9) {
      params.gender = 3
    }
    return this.http.get(API_URL + endpoint, { params });
  }

  getGeneratedAngelName() {
    const endpoint = 'get_generated_angel_name';
    return this.http.get(API_URL + endpoint, {});
  }

  getClanNames(tags = []) {
    const endpoint = 'get_clan_names';
    let tagsToString = tags.join(',');
    return this.http.get(API_URL + endpoint, { params: { tags: tagsToString } });
  }

  getSurnames(raceId) {
    const endpoint = 'get_surnames';
    return this.http.get(API_URL + endpoint, { params: { race_id: raceId, random: 'true' } });
  }

  getRaces() {
    const endpoint = 'get_races';
    return this.http.get(API_URL + endpoint, { params: { limit: '200', ids: '3,5,6,14,9,10' } });
  }

  getTitles(lang) {
    const endpoint = 'get_titles';
    return this.http.get(API_URL + endpoint, { params: { lang, random: 'true' } });
  }
}
