import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ListPageComponent } from "./pages/list-page/list-page.component"
import { EditPageComponent } from "./pages/edit-page/edit-page.component"
import { MapPageComponent } from "./pages/map-page/map-page.component"

const routes: Routes = [
  {
    path: "",
    component: ListPageComponent,
    data: { title: "Users" },
  },
  {
    path: "create",
    component: EditPageComponent,
    data: { title: "Create User" },
  },
  {
    path: "update/:id",
    component: EditPageComponent,
    data: { title: "Edit User" },
  },
  { path: "map", component: MapPageComponent, data: { title: "Map" } },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
