import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { UsersService } from "../../services/users.service"
import { AccessLevel, IUser } from "../../models/user"
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { catchError, of } from "rxjs"

@Component({
  selector: "app-edit-page",
  templateUrl: "./edit-page.component.html",
  styleUrls: ["./edit-page.component.scss"],
})
export class EditPageComponent implements OnInit {
  user: IUser | null = null
  userForm: FormGroup
  AccessLevelEnum = Object.entries(AccessLevel)

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
  ) {
    const requiredValidator = this.user ? [Validators.required] : []

    this.userForm = new FormGroup({
      fullName: new FormControl(this.user?.fullName || "", requiredValidator),
      email: new FormControl(
        this.user?.email || "",
        requiredValidator.concat(Validators.email),
      ),
      address: new FormControl(this.user?.address || "", requiredValidator),
      acl: new FormControl(
        this.user?.acl || AccessLevel.VIEWER,
        requiredValidator,
      ),
      avatar: new FormControl(this.user?.avatar || ""),
      homeLocation: new FormGroup({
        lat: new FormControl(
          this.user?.homeLocation.lat || 0,
          requiredValidator,
        ),
        lng: new FormControl(
          this.user?.homeLocation.lng || 0,
          requiredValidator,
        ),
      }),
    })
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get("id")
    if (userId) {
      this.usersService
        .getUserById(userId)
        .pipe(
          catchError((val) => {
            return of(`I caught: ${val}`)
          }),
        )
        .subscribe((user) => {
          if (typeof user !== "string") {
            this.user = user
            this.userForm.patchValue(user)
          }
        })
    }
  }

  onRemove(evt: Event) {
    evt.preventDefault()

    !!this.user?._id &&
      window.confirm("Are you sure you want to delete the user?") &&
      this.usersService.removeUserById(this.user._id).subscribe(async () => {
        await this.router.navigate(["/"])
      })
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData: IUser = this.userForm.value

      if (this.user) {
        this.usersService
          .updateUser({ ...userData, _id: this.user._id })
          .subscribe()
      } else {
        this.usersService.createUser(userData).subscribe()
      }
    }
  }
}
