import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharacterComponent } from './character.component';
import { CharacterLoadingComponent } from './character-loading/character-loading.component';

const components = [CharacterListComponent, CharacterDetailsComponent, CharacterComponent,CharacterLoadingComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule,
    InfiniteScrollModule
  ],
  exports: [
    ...components
  ]
})
export class CharactersModule { }
