import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { IUser } from "../user.interface"
import { AccessLevel } from "../../common/enums/accessLevel"

@Schema()
export class User extends Document implements Omit<IUser, "_id"> {
  @Prop({ type: String, required: true })
  fullName: string

  @Prop({ type: String, required: true, unique: true })
  email: string

  @Prop({ type: String, required: true })
  address: string

  @Prop({ type: String, required: true, enum: Object.values(AccessLevel) })
  acl: AccessLevel

  @Prop({ type: String })
  avatar?: string

  @Prop({ required: true, type: { lat: Number, lng: Number } })
  homeLocation: IUser["homeLocation"]
}

export const UserSchema = SchemaFactory.createForClass(User)
