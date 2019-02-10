import { MyMaterialModule } from './../../mymaterial';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CardComponent } from './card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatIcon, MatIconModule, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
@NgModule({
  declarations: [WishlistComponent , HeaderComponent, FooterComponent, CardComponent , SearchComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    MyMaterialModule
  ],
 exports: [WishlistComponent , HeaderComponent, FooterComponent, CardComponent, SearchComponent, WishlistComponent]
 })
export class ModulesModule { }
