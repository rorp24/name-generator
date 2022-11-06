import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { CacheService } from './services/cache.service';
import { ToolsService } from './services/tools.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public appPages = [
    { title: 'Humain', url: '3' },
  ];

  public races;
  constructor(
    private api: ApiService,
    private cache: CacheService,
    private tools: ToolsService
    ) {
      //TODO get language
      this.api.getRaces().subscribe(races=>{
        if(Array.isArray(races)){
          this.cache.racesData = races;
          this.appPages = this.cache.racesData.map((race)=> {
            const lang = this.cache.lang;
            if(lang){
              console.log(lang);
            }
            return {title: this.tools.capitalize(race.frname) ,url:race.id};
          });
        }
      });
    }
}
