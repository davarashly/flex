import { AccessLevel } from "../common/enums/accessLevel"

export interface IUser {
  _id: string
  fullName: string
  email: string
  address: string
  acl: AccessLevel
  avatar?: string
  homeLocation: {
    lat: number
    lng: number
  }
}
