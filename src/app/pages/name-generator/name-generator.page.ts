import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { LoadingController } from '@ionic/angular';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-name-generator',
  templateUrl: './name-generator.page.html',
  styleUrls: ['./name-generator.page.scss'],
})

export class NameGeneratorPage implements OnInit {
  names: Array<string>;
  currentRace: number;
  racesList
  gender: 0|1|2;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private tools: ToolsService,
    private cache: CacheService,
    private loading:LoadingController
    ) {
      this.route.params.subscribe(par=>{
        this.currentRace = par.id || 3;
        this.gender = par.gender || 3;
        this.getNames();
      });
      if(this.cache.racesData && this.cache.racesData.length){
        this.racesList = this.cache.racesData
      }
      else{
        this.api.getRaces().subscribe(races=>{
          if(Array.isArray(races)){
            this.cache.racesData = races;
            this.racesList = this.cache.racesData.map((race)=> {
              const lang = this.cache.lang;
              if(lang){
                console.log(lang);
              }
              return {title: this.tools.capitalize(race.frname) ,id:race.id};
            });
          }
        });
      }
  }

  ngOnInit() {
  }

  async getNames() {
    let load = await this.loading.create({
      spinner: 'circles'
    })
    load.present()
    Promise.all([
      this.api.getNames(this.currentRace,this.gender).toPromise(),
      this.api.getSurnames(this.currentRace).toPromise()
    ]).then(names=>{
      if(Array.isArray(names[0]) && Array.isArray(names[1])){
        this.names = [];
        names[0].forEach((_,i) => {
          this.names.push(this.tools.capitalize(names[0][i].name) + ' ' + this.tools.capitalize(names[1][i].surname));
        });
      }
      load.dismiss()
    });
  }

}
