import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-name-generator',
  templateUrl: './name-generator.page.html',
  styleUrls: ['./name-generator.page.scss'],
})

export class NameGeneratorPage implements OnInit {
  names: Array<string>;
  currentRace: number;
  racesList;
  generated = false;
  gender: 0 | 1 | 2 | 3;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private tools: ToolsService,
    private cache: CacheService,
    private loading: LoadingController,
    private alert: AlertController
  ) {
    this.route.params.subscribe(par => {
      this.currentRace = par.id || 3;
      this.gender = par.gender || 3;
      this.getNames();
    });
    if (this.cache.racesData && this.cache.racesData.length) {
      this.racesList = this.cache.racesData;
    }
    else {
      this.api.getRaces().subscribe(races => {
        if (Array.isArray(races)) {
          this.cache.racesData = races;
          this.racesList = this.cache.racesData.map((race) => {
            const lang = this.cache.lang;
            if (lang) {
              //TODO ajouter la langue
              console.log(lang);
            }
            return { title: this.tools.capitalize(race.frname), id: race.id };
          });
        }
      });
    }
  }

  ngOnInit() {
  }

  async getNames() {
    const load = await this.loading.create({
      spinner: 'circles'
    });
    load.present();
    let promiseList = []
    let surnameIsClan = false;

    //angel
    if (this.currentRace == 9 && this.generated) {
      promiseList.push(this.api.getGeneratedAngelName().toPromise())
    }
    else {
      promiseList.push(this.api.getNames(this.currentRace, this.gender).toPromise())
    }

    //Orc ou nain
    switch (Number(this.currentRace)) {
      case 6:
        promiseList.push(this.api.getClanNames(['guerrier', 'sauvage']).toPromise())
        surnameIsClan = true
        break;
      case 14:
        promiseList.push(this.api.getClanNames(['guerrier', 'artisan']).toPromise())
        surnameIsClan = true
        break;
      default:
        promiseList.push(this.api.getSurnames(this.currentRace).toPromise())
        break;
    }

    Promise.all(promiseList).then(names => {
      if (Array.isArray(names[0]) && Array.isArray(names[1])) {
        this.names = [];
        names[0].forEach((_, i) => {
          let string = this.tools.capitalize(names[0][i].name)

          if (names[1]['length'] && surnameIsClan)
            string += ' ' + this.tools.capitalize(names[1][i])
          else
            string += ' ' + this.tools.capitalize(names[1][i].surname)

          this.names.push(string);
        });
      }
      load.dismiss();
    }).catch(async (r) => {
      console.error(r)
      load.dismiss();
      const alert = await this.alert.create({
        header: 'Erreur',
        message: 'Nous avons perdu la connexion avec le site d\'un rôliste flemmard. Veuillez vérifier votre connexion internet et recommencer.',
        buttons: ['Compris'],
        cssClass: "error"
      });
      alert.present();
    });
  }

}
