import { InputType, Int, Field } from '@nestjs/graphql';


@InputType()
class HomeLocationInput {
  @Field()
  lat: number;

  @Field()
  lng: number;
}

@InputType()
export class CreateUserInput {
  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field()
  address: string;

  @Field()
  acl: string;

  @Field(() => HomeLocationInput)
  homeLocation: HomeLocationInput;
}
