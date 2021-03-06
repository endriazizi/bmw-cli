import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { MapService } from './map.service';
import { CamelizePipe } from 'ngx-pipes'
// For Ng Directive
import { CommonModule } from '@angular/common';



@NgModule({
  //we must declare here all new components after we imported them!!!
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB7gio2U2msieGzUPhGem029HtNj3Rw5x8'
    }),
    CommonModule

  ],
  providers: [MapService, CamelizePipe]
})
export class MapModule { }
