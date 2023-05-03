import { NgModule } from "@angular/core"
import { GoogleMapsModule } from "@angular/google-maps"
import { CommonModule } from "@angular/common"
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http"

import { GoogleMapsComponent } from "../components/google-maps/google-maps.component"

@NgModule({
  declarations: [GoogleMapsComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  exports: [GoogleMapsComponent],
})
export class GoogleMapsDemoModule {}
