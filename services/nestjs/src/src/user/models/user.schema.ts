import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { IUser } from "../user.interface"
import { AccessLevel } from "../../common/enums/accessLevel"

@Schema()
export class User extends Document implements Omit<IUser, "_id"> {
  @Prop({ required: true })
  fullName: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  address: string

  @Prop({ required: true, enum: Object.values(AccessLevel) })
  acl: AccessLevel

  @Prop()
  avatar?: string

  @Prop({ required: true, type: { lat: Number, lng: Number } })
  homeLocation: IUser["homeLocation"]
}

export const UserSchema = SchemaFactory.createForClass(User)
