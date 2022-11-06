import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  capitalize([first, ...rest], lowerRest = false) {
    return first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));
  }
}
