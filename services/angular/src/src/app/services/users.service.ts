import { Injectable } from "@angular/core"
import { BehaviorSubject, map, Observable, tap } from "rxjs"
import { IUser } from "../models/user"
import { Apollo, gql } from "apollo-angular"

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>(
    [],
  )
  public users$: Observable<IUser[]> = this.usersSubject.asObservable()

  constructor(private apollo: Apollo) {
    this.loadInitialUsers()
  }

  private loadInitialUsers(): void {
    this.getAll().subscribe((users) => this.usersSubject.next(users))
  }

  getAll(): Observable<IUser[]> {
    const query = gql`
      query {
        users {
          _id
          acl
          address
          avatar
          email
          fullName
          homeLocation {
            lat
            lng
          }
        }
      }
    `

    return this.apollo
      .watchQuery<{ users: IUser[] }>({
        query,
      })
      .valueChanges.pipe(map((result) => result.data.users))
  }

  getUserById(id: string): Observable<IUser> {
    const query = gql`
      query user($id: String!) {
        user(id: $id) {
          _id
          acl
          address
          avatar
          email
          fullName
          homeLocation {
            lat
            lng
          }
        }
      }
    `

    return this.apollo
      .watchQuery<{ user: IUser }>({
        query,
        variables: { id },
      })
      .valueChanges.pipe(map((result) => result.data.user))
  }

  createUser(user: IUser): Observable<IUser> {
    const mutation = gql`
      mutation UpdateUser($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
          _id
          acl
          address
          avatar
          email
          fullName
          homeLocation {
            lat
            lng
          }
        }
      }
    `

    return this.apollo
      .mutate<{ createUser: IUser }>({
        mutation,
        variables: { createUserInput: user },
      })
      .pipe(
        map((result) => result.data!.createUser),
        tap((createdUser) => {
          const newUsers = [...this.usersSubject.getValue(), createdUser]

          this.usersSubject.next(newUsers)
        }),
      )
  }

  updateUser(user: IUser): Observable<IUser> {
    const mutation = gql`
      mutation updateUser($updateUserInput: UpdateUserInput!) {
        updateUser(updateUserInput: $updateUserInput) {
          _id
          acl
          address
          avatar
          email
          fullName
          homeLocation {
            lat
            lng
          }
        }
      }
    `

    return this.apollo
      .mutate<{ updateUser: IUser }>({
        mutation,
        variables: { updateUserInput: user },
      })
      .pipe(
        map((result) => result.data!.updateUser),
        tap((updatedUser) => {
          const users = [...this.usersSubject.getValue()]

          for (let i = 0; i < users.length; i++) {
            if (users[i]._id === updatedUser._id) {
              users[i] = updatedUser
              this.usersSubject.next(users)
              break
            }
          }
        }),
      )
  }

  removeUserById(id: string): Observable<string> {
    const mutation = gql`
      mutation updateUser($removeUserId: String!) {
        removeUser(id: $removeUserId) {
          _id
        }
      }
    `

    return this.apollo
      .mutate<{ removeUser: string }>({
        mutation,
        variables: { removeUserId: id },
      })
      .pipe(
        map((result) => result.data!.removeUser),
        tap((removedUserId) => {
          const users = this.usersSubject.getValue()

          const updatedUsers = []

          for (const user of users) {
            if (user._id !== removedUserId) {
              updatedUsers.push(user)
            }
          }

          this.usersSubject.next(updatedUsers)
        }),
      )
  }
}
