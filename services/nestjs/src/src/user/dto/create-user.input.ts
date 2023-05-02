import { InputType, Int, Field } from "@nestjs/graphql"
import { IUser } from "../user.interface"
import { AccessLevel } from "../../common/enums/accessLevel"

@InputType()
class HomeLocationInput {
  @Field()
  lat: number

  @Field()
  lng: number
}

@InputType()
export class CreateUserInput implements Omit<IUser, "_id"> {
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

  @Field(() => HomeLocationInput)
  homeLocation: HomeLocationInput
}
