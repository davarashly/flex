import { Module } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserResolver } from "./user.resolver"
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "./models/user.schema"

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  providers: [UserResolver, UserService],
})
export class UserModule {}
