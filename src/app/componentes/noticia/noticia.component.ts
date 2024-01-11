import { GestionNoticiasService } from './../../servicios/gestion-noticias.service';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Article } from 'src/app/Interfaces/mi-interfaz';
import { GestionAlmacenamientoService } from 'src/app/servicios/gestion-almacenamiento.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent  implements OnInit {

  @Input() articulo: Article = {} as Article;

  /* Dentro de nuestro constructor creamos un objeto que será de la clase de nuestro servicio.A su vez,
  crearemos el objeto alerta, que es de tipo AlertController, lo que nos permitirá sacar el recuadro de aviso*/
   constructor(private gestionNoticias:GestionNoticiasService,private alerta:AlertController) { }

  ngOnInit() {}

  //Método on click . Recibe la variable título del html y llama al método asíncrono confirmarBorrar
  onClick() {
    this.confirmarBorrar();  
  }

  async confirmarBorrar() {
    const alert = await this.alerta.create({
      header: 'Confirmar',
      message: 'Borrar noticia?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.gestionNoticias.borrarArticulo(this.articulo);
          }
        }
      ]
    });

    await alert.present();
  }

}
