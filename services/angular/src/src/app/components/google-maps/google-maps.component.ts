import { Component } from "@angular/core"
import { MapInfoWindow, MapMarker } from "@angular/google-maps"
import { catchError, map, Observable, of } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { environment } from "../../../environments/environment"
import { IUser } from "../../models/user"
import { UsersService } from "../../services/users.service"

@Component({
  selector: "app-google-maps",
  templateUrl: "./google-maps.component.html",
  styleUrls: ["./google-maps.component.scss"],
})
export class GoogleMapsComponent {
  apiLoaded: Observable<boolean>
  users: Observable<IUser[]>
  private openInfoWindowRef: MapInfoWindow | null = null

  options: google.maps.MapOptions = {
    center: { lat: 20, lng: 10 },
    zoom: 4,
  }

  openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    if (this.openInfoWindowRef && this.openInfoWindowRef !== infoWindow) {
      this.openInfoWindowRef.close()
    }
    infoWindow.open(marker)
    this.openInfoWindowRef = infoWindow
  }

  onAvatarError(e: Event) {
    const imgElement = e.target as HTMLImageElement

    imgElement.src = "assets/img/users/avatar.svg"
  }

  constructor(
    private httpClient: HttpClient,
    private usersService: UsersService,
  ) {
    this.users = this.usersService.users$

    this.apiLoaded = httpClient
      .jsonp(
        "https://maps.googleapis.com/maps/api/js?key=" +
          environment.GoogleMapsApiKey,
        "callback",
      )
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      )
  }
}
