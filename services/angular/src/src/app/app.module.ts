import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { ListPageComponent } from "./pages/list-page/list-page.component"
import { UserComponent } from "./components/user/user.component"
import { GraphQLModule } from "./modules/graphql.module"
import { HttpClientModule } from "@angular/common/http"
import { RangePipe } from "./pipes/range.pipe";
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { NavbarComponent } from './components/navbar/navbar.component'

@NgModule({
  declarations: [
    AppComponent,
    ListPageComponent,
    UserComponent,
    RangePipe,
    EditPageComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
