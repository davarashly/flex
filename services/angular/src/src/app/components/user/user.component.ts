import { Component, Input } from "@angular/core"
import { IUser } from "../../models/user"

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent {
  @Input() user: IUser

  onAvatarError(e: Event) {
    const imgElement = e.target as HTMLImageElement

    imgElement.src = "assets/img/users/avatar.svg"
  }
}
