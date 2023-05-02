export enum AccessLevel {
  ADMIN = "acc",
  EDITOR = "ecc",
  VIEWER = "vcc",
}



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
