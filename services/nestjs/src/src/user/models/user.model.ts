import { ObjectType, Field, Int } from "@nestjs/graphql"
import { IUser } from "../user.interface"
import { AccessLevel } from "../../common/enums/accessLevel"

@ObjectType()
export class HomeLocation {
  @Field()
  lat: number

  @Field()
  lng: number
}

@ObjectType()
export class User implements IUser {
  @Field()
  _id: string

  @Field()
  fullName: string

  @Field()
  email: string

  @Field()
  address: string

  @Field()
  acl: AccessLevel

  @Field({ nullable: true })
  avatar?: string

  @Field(() => HomeLocation)
  homeLocation: HomeLocation
}
