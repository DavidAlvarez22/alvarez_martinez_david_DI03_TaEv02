import { Component } from '@angular/core';
import { GestionNoticiasService } from '../servicios/gestion-noticias.service';
import { Article } from '../Interfaces/mi-interfaz';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
   
  constructor(public gestionDatos : GestionNoticiasService) {}
 

  segmentChanged(event : any){
    this.gestionDatos.getLeerFichero(event.target.value)
  }

  //Función actualizarCheck . Recibe un evento que se trata de si se ha pulsado el check o no en nuestra página y el artículo seleccionado
 actualizarCheck(evento: { detail: { checked: boolean; }; }, articulo: Article){
    
  //Mediante esta estructura condicional comprobamos que el atributo checked de nuestro evento esté en true, es decir , 
  //que se haya clickado y si es así, llamamos a la función insertar. Si se pulsa y es false, llamamos a la función borrar
  if (evento.detail.checked == true){
    
    //Llamamos a la función insertarArticulo de nuestro servicio y le pasamos el parámetro título.
   this.gestionDatos.insertarArticulo(articulo);
    }
  else if(evento.detail.checked == false) {
    this.gestionDatos. borrarArticulo(articulo);
  } 
}
// Método cambiarCheck que comprueba si la noticia pasada está en el ArraySegunda Página y nos devuelve true o false de cara a poder poner el tic en el checkbox de tab1.
cambiarCheck(articulo : Article){
  let indice : number = this.gestionDatos.comprobar(articulo);
  if(indice != -1){
    return true;
  }
  else{
    return false;
  }
}

}