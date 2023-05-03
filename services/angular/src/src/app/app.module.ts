import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { ListPageComponent } from "./pages/list-page/list-page.component"
import { UserComponent } from "./components/user/user.component"
import { GraphQLModule } from "./modules/graphql.module"
import { HttpClientModule } from "@angular/common/http"
import { RangePipe } from "./pipes/range.pipe"
import { EditPageComponent } from "./pages/edit-page/edit-page.component"
import { NavbarComponent } from "./components/navbar/navbar.component"
import { IsInvalidDirective } from "./directives/is-invalid.directive"
import { GoogleMapsDemoModule } from "./modules/google-maps.module"
import { MapPageComponent } from "./pages/map-page/map-page.component"

@NgModule({
  declarations: [
    AppComponent,
    ListPageComponent,
    MapPageComponent,
    UserComponent,
    RangePipe,
    EditPageComponent,
    NavbarComponent,
    IsInvalidDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    GoogleMapsDemoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
