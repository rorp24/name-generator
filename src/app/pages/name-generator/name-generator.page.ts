import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-name-generator',
  templateUrl: './name-generator.page.html',
  styleUrls: ['./name-generator.page.scss'],
})

export class NameGeneratorPage implements OnInit {
  names: Array<string>;
  race: number;
  gender: 0|1|2;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private tools: ToolsService
    ) {
      this.route.params.subscribe(par=>{
        console.log(par);
        this.race = par.id || 3;
        this.gender = par.gender || 2;
        this.getNames();
      });
  }

  ngOnInit() {
  }

  getNames() {
    Promise.all([
      this.api.getNames(this.race,this.gender).toPromise(),
      this.api.getSurnames(this.race).toPromise()
    ]).then(names=>{
      if(Array.isArray(names[0]) && Array.isArray(names[1])){
        this.names = [];
        names[0].forEach((_,i) => {
          this.names.push(this.tools.capitalize(names[0][i].name) + ' ' + this.tools.capitalize(names[1][i].surname));
        });
      }
      console.log(this.names);
    });
  }

}
