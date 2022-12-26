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

  public races;
  constructor() {
    }
}
