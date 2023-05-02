import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ListPageComponent } from "./pages/list-page/list-page.component"
import { EditPageComponent } from "./pages/edit-page/edit-page.component"

const routes: Routes = [
  {
    path: "",
    component: ListPageComponent,
  },
  { path: "create", component: EditPageComponent },
  { path: "update/:id", component: EditPageComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
