import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { HomeComponent } from './pages/home/home.component';
import { MembersListComponent } from './members/member-list/members-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:"home", component:HomeComponent },
  
  {path:"members", component:MembersListComponent, canActivate:[AuthGuard] },
  {path:"members/:id", component:MemberDetailComponent, canActivate:[AuthGuard] },
  {path:"messages", component:MessagesComponent , canActivate:[AuthGuard] },
  {path:"lists", component:ListsComponent , canActivate:[AuthGuard] },
  {path:"**", pathMatch:"full",redirectTo:"home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
