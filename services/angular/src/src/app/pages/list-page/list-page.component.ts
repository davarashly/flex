import { Component, OnDestroy, OnInit } from "@angular/core"
import { UsersService } from "../../services/users.service"
import { IUser } from "../../models/user"
import { debounceTime, fromEvent, Observable, Subscription } from "rxjs"

@Component({
  selector: "app-list-page",
  templateUrl: "./list-page.component.html",
  styleUrls: ["./list-page.component.scss"],
})
export class ListPageComponent implements OnInit, OnDestroy {
  users$: Observable<IUser[]>
  usersCount: number
  dummyColumnsCount: number
  private loading = false
  private resizeSubscription: Subscription

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loading = true
    this.users$ = this.usersService.users$
    this.resizeSubscription = fromEvent(window, "resize")
      .pipe(debounceTime(200))
      .subscribe((event: Event) => this.onResize(event))

    this.users$.subscribe((users) => {
      this.usersCount = users.length
      this.onResize()
    })
  }

  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe()
  }

  onResize(_event?: Event): void {
    let columnsPerRow: number

    switch (true) {
      case window.innerWidth < 576:
        columnsPerRow = 1
        break
      case window.innerWidth < 768:
        columnsPerRow = 2
        break
      case window.innerWidth > 992:
        columnsPerRow = 3
        break
      case window.innerWidth > 1200:
      default:
        columnsPerRow = 4
        break
    }

    const remainder = this.usersCount % columnsPerRow
    this.dummyColumnsCount = remainder > 0 ? columnsPerRow - remainder : 0
  }
}
