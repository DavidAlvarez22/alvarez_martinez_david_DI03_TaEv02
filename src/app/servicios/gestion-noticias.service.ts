import { Injectable } from '@angular/core';
import { Article, RootObject } from '../Interfaces/mi-interfaz';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GestionAlmacenamientoService } from './gestion-almacenamiento.service';

@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasService {

   //Definimos el objeto todoFichero que será de la clase RootObject y lo inicializamos
   private todoFichero : RootObject= {
    "status": "",
    "totalResults": 0,
    "articles" : []
   };
   
  // Definimos el objeto arraySegundaPagina que será un array de la clase Article y lo iniciamos
  private arraySegundaPagina : Article[] = [];

  private tipoArticulo: any = "GENERAL";
  
  //Dentro del constructor introduciremos el objeto leerfichero que será de la clase HttpClient. Esto nos permitirá leer el archivo json.
  //Declaramos también nuestro servicio de almacenamiento
  constructor(private leerFichero: HttpClient,private gestionAlmacen : GestionAlmacenamientoService) {
    //Llamamos al método getleerFichero. Le pasamos la variable tipo articulo
    this.getLeerFichero(this.tipoArticulo);
    
    
   let datosPromesa : Promise <Article[]> = gestionAlmacen.getObject("arraySegundaPagina");
    datosPromesa.then( datos => {
      this.arraySegundaPagina = datos;
    })
    let datosPromesa2 : Promise <RootObject> = gestionAlmacen.getObject("todoFichero");
    datosPromesa2.then( datos => {
      this.todoFichero = datos;
    })

   }

   // Método getLeerFichero().Recibe el tipo de artículo y en función del mismo llama a un listado u otro. 
  getLeerFichero(tipoArticulo : any){
   
    //Definimos el objeto datosFichero que será un objeto de Observable de la clase RootObject
   let datosFichero: Observable<RootObject>;
   switch (tipoArticulo){
     case "GENERAL" : 
      
   //Nuestro objeto utilizará la función get de la clase httpClient que hemos definido en el constructor, para lo cual le debemos pasar la url del archivo a leer
   datosFichero =this.leerFichero.get<RootObject>("https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=3bda5b65e443446a8cbbd3d7c1144e22");

   //Finalmente mediante una función arrow, los datos del objeto datosFichero los introduciremos en nuestro objeto todoFichero que hemos creado al inicio
   datosFichero.subscribe(datos =>{
     this.todoFichero = datos;

     //actualizamos mediante setObject nuestro objeto en el storage
     this.gestionAlmacen.setObject("todoFichero", this.todoFichero);
   });

     break;
     case "BUSINESS" : 
         
   //Nuestro objeto utilizará la función get de la clase httpClient que hemos definido en el constructor, para lo cual le debemos pasar la url del archivo a leer
   datosFichero =this.leerFichero.get<RootObject>("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3bda5b65e443446a8cbbd3d7c1144e22");

   //Finalmente mediante una función arrow, los datos del objeto datosFichero los introduciremos en nuestro objeto todoFichero que hemos creado al inicio
   datosFichero.subscribe(datos =>{
     this.todoFichero = datos;

     //actualizamos mediante setObject nuestro objeto en el storage
     this.gestionAlmacen.setObject("todoFichero", this.todoFichero);
   });

     break;
     case "TECHNOLOGY" : 

     //Nuestro objeto utilizará la función get de la clase httpClient que hemos definido en el constructor, para lo cual le debemos pasar la url del archivo a leer
   datosFichero =this.leerFichero.get<RootObject>("https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=3bda5b65e443446a8cbbd3d7c1144e22");

   //Finalmente mediante una función arrow, los datos del objeto datosFichero los introduciremos en nuestro objeto todoFichero que hemos creado al inicio
   datosFichero.subscribe(datos =>{
     this.todoFichero = datos;

     //actualizamos mediante setObject nuestro objeto en el storage
     this.gestionAlmacen.setObject("todoFichero", this.todoFichero);
   });

     break;
     case "SCIENCE" : 
//Nuestro objeto utilizará la función get de la clase httpClient que hemos definido en el constructor, para lo cual le debemos pasar la url del archivo a leer
datosFichero =this.leerFichero.get<RootObject>("https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=3bda5b65e443446a8cbbd3d7c1144e22");

//Finalmente mediante una función arrow, los datos del objeto datosFichero los introduciremos en nuestro objeto todoFichero que hemos creado al inicio
datosFichero.subscribe(datos =>{
 this.todoFichero = datos;

 //actualizamos mediante setObject nuestro objeto en el storage
 this.gestionAlmacen.setObject("todoFichero", this.todoFichero);
});


     break;
     case "SPORTS" : 
     //Nuestro objeto utilizará la función get de la clase httpClient que hemos definido en el constructor, para lo cual le debemos pasar la url del archivo a leer
   datosFichero =this.leerFichero.get<RootObject>("https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=3bda5b65e443446a8cbbd3d7c1144e22");

   //Finalmente mediante una función arrow, los datos del objeto datosFichero los introduciremos en nuestro objeto todoFichero que hemos creado al inicio
   datosFichero.subscribe(datos =>{
     this.todoFichero = datos;

     //actualizamos mediante setObject nuestro objeto en el storage
     this.gestionAlmacen.setObject("todoFichero", this.todoFichero);
   });

     break
   }
 }
      
  //Función getDatosArchivo(). No recibe ninguna variable y devuelve un array de la clase Article
  getDatosArchivo() {
    return this.todoFichero.articles;
      }

  //Función getDatosArchivoSegundaPagina(). No recibe ninguna variable y devuelve un array de la clase Article
  getDatosArchivoSegundaPagina() {
    return this.arraySegundaPagina;
    } 

  // Función insertarArticulo(). Recibe un artículo y no devuelve nada. Sirve para insertar en el array arraySegundaPagina un nuevo artículo  
  insertarArticulo(articulo : Article){

    // En primer lugar, buscaremos el artículo en nuestro objeto todo fichero a través de la función find de arrays a través de una función anónima que devuelve el artículo que coincida con el articulo pasado a nuestra función
    let articuloEncontrado  = this.todoFichero.articles.find(function(cadaArticulo){return cadaArticulo == articulo});
    
    //Estructura condicional que nos controla que artículo encontrado, no sea undefined.
   if(articuloEncontrado){
      // En segundo lugar creamos una variable indice que nos mostrará a través de la función indexOf la posición de nuestro artículo en el array
      let indice : number = this.todoFichero.articles.indexOf(articuloEncontrado);
          
      //Para implementar el control de artículo y que no podamos seleccionar dos veces el artículo a leer, vamos a realizar la misma búsqueda , pero en este caso en un segundo array que será el que aparezca en la página leer.
      let articuloEncontradoArrayDos :Article = this.arraySegundaPagina.find(function(cadaArticulo){return cadaArticulo == articulo})!;
            
        // Buscamos el índice en este segundo array. Si no se encuentra la noticia, nos devolverá -1
       let indice2: number = this.arraySegundaPagina.indexOf(articuloEncontradoArrayDos);
       
        //Estructura condicional que nos permitirá introducir solo aquellos artículos que no se encuentren en el array de noticias seleccionadas. Por eso solo permitirá que se introduzcan los artículos cuyo índice sea igual a -1, es decir, que no existen en el array  
        if (indice2 == -1){
    
          //Si no existe en el array, mediante la función push meteremos la noticia
          this.arraySegundaPagina.push(this.todoFichero.articles[indice]);
          //this.arraySegundaPagina.push(articulo);

          //actualizamos mediante setObject nuestro array en el storage
          this.gestionAlmacen.setObject("arraySegundaPagina", this.arraySegundaPagina);
        }
    }
  }   
  
  // Función borrarArticulo(). Recibe la noticia y no devuelve nada. Sirve para borrar en el array arraySegundaPagina un nuevo artículo
  borrarArticulo(item: Article) {
    let indice = this.comprobar(item);
    if (indice != -1) {
      this.arraySegundaPagina.splice(indice, 1);
    }
  }
  // Función comprobar(). Recibe una noticia y devuelve el índice de la misma o -1 en caso de no encontrarla en el array arraySegundaPagina  
  comprobar(articulo: Article){
    
    // buscar el artículo
    let articuloEncontrado = this.arraySegundaPagina.find(function(cadaArticulo){return JSON.stringify(cadaArticulo) == JSON.stringify(articulo)})!;

    // buscar el índice del articulo por el array
    let indice : number = this.arraySegundaPagina.indexOf(articuloEncontrado);
    
    return indice;
  }
   
}
