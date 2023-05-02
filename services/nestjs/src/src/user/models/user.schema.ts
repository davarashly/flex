import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class User extends Document {
  @Prop({ required: true })
  fullName: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  address: string

  @Prop({ required: true })
  acl: string

  @Prop({ required: true, type: { lat: Number, lng: Number } })
  homeLocation: {
    lat: number
    lng: number
  }
}

export const UserSchema = SchemaFactory.createForClass(User)
