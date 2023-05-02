import { Injectable } from "@nestjs/common"
import { CreateUserInput } from "./dto/create-user.input"
import { UpdateUserInput } from "./dto/update-user.input"
import { InjectModel } from "@nestjs/mongoose"
import { User } from "./models/user.schema"
import { Model } from "mongoose"

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = new this.userModel(createUserInput)
    return newUser.save()
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec()
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserInput, { new: true })
      .exec()
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec()
  }
}
