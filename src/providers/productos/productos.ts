import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
import 'rxjs/add/operator/map';
import { HttpClientModule } from '@angular/common/http';
@Injectable()
export class ProductosProvider {

  pagina:number=1;
  productos:any[]=[];
  lineas:any[]= [];
  por_categoria:any[]=[];
  categoria:any="";
  paginaC:number=1;
  constructor(public http: HttpClient) {
      this.cargar_lineas();
      this.cargar_todos();
  }

  cargar_lineas(){
    let url=URL_SERVICIOS+'lineas';

    this.http.get(url).map(resp=>resp)
      .subscribe(data=>{
        console.log(data);
        if(data['error']){

        }else{
          this.lineas=data['lineas'];

        }
      });
  }

  cargar_todos(){

    let promesa= new Promise((resolve,reject)=>{
      let url=URL_SERVICIOS + 'productos-pagina?page='+this.pagina;

      this.http.get(url)
        .map(resp=>resp)
        .subscribe(data=>{
          
          if(data['error']){

          }else{
            if(data['productos'].length==0){
              resolve(false);
            }else{
              let nuevaData=this.agrupar(data['productos'].data , 2);
              this.productos.push(...nuevaData);
              this.pagina+=1;
              resolve(true);
            }
              
          }
          
        });
    });

    return promesa;
    	
  }

  cargar_por_categoria(categoria:number){
    console.log("++++>"+categoria);
    if(this.categoria!=categoria){
      this.por_categoria=[];
      this.paginaC=1;
    }
    this.categoria=categoria;
    let promesa= new Promise((resolve,reject)=>{
      let url=URL_SERVICIOS + 'productos/find/'+categoria+'+?page='+this.paginaC;

      this.http.get(url)
        .map(resp=>resp)
        .subscribe(data=>{
          
          if(data['error']){

          }else{
             console.log("LLEGA CON LA CATEGORIA++++>"+categoria);
            if(data['productos'].length==0){
              resolve(false);
            }else{
              let nuevaData=this.agrupar(data['productos'].data , 2);
              this.por_categoria.push(...nuevaData);
              this.paginaC+=1;
              resolve(true);
            }
              
          }
          
        });
    });

    return promesa;
  }

  private agrupar(arr:any , tamano:number){
    let nuevoArreglo=[];

    for( let i=0; i< arr.length; i+=tamano) {
      nuevoArreglo.push(arr.slice(i, i+tamano));
    }
    

    return nuevoArreglo;
  }
}
