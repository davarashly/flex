import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { GraphQLModule } from "@nestjs/graphql"
import { UserModule } from "./user/user.module"
import * as path from "path"
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default"

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://mongodb:27017"),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: path.resolve(process.cwd(), "schema.gql"),
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UserModule,
  ],
})
export class AppModule {}
