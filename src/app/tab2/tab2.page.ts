import { Component } from '@angular/core';
import { GestionNoticiasService } from '../servicios/gestion-noticias.service';
import { AlertController } from '@ionic/angular';
import { Article } from '../Interfaces/mi-interfaz';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  listaNoticias: Article[] = [];
  /* Dentro de nuestro constructor creamos un objeto que será de la clase de nuestro servicio.*/
  constructor(public gestionDatos : GestionNoticiasService) {}
}
