import { SearchComponent } from './modules/search/search.component';
import { AppComponent } from './app.component';
import { CardComponent } from './modules/card/card.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WishlistComponent } from './modules/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'home', component: SearchComponent },
  { path: 'wishlist', component: WishlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
