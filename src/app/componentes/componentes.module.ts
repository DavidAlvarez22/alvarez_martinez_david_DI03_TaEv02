import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderTabComponent } from './header-tab/header-tab.component';
import { NoticiaComponent } from './noticia/noticia.component';



@NgModule({
  declarations: [HeaderTabComponent,NoticiaComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[HeaderTabComponent,NoticiaComponent]
})
export class ComponentesModule { }
