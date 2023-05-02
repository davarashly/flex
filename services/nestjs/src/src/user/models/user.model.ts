import { ObjectType, Field, Int } from "@nestjs/graphql"

@ObjectType()
export class HomeLocation {
  @Field()
  lat: number

  @Field()
  lng: number
}

@ObjectType()
export class User {
  @Field()
  _id: string

  @Field()
  fullName: string

  @Field()
  email: string

  @Field()
  address: string

  @Field()
  acl: string

  @Field(() => HomeLocation)
  homeLocation: HomeLocation
}
