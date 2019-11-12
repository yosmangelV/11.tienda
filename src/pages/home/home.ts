import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductosProvider, CarritoProvider, UsuarioProvider} from '../../providers/index.service';
import { HttpClientModule } from '@angular/common/http';
//PAGES
import {  CarritoPage,
          CategoriasPage,
          LoginPage,
          OrdenesPage,
          OrdenesDetallePage,
          PorCategoriasPage,
          TabsPage,
          ProductoPage 
        } from '../index.paginas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  hayMas:boolean=true;
  constructor(public navCtrl: NavController,
  				public _ps:ProductosProvider,
          private _carrito:CarritoProvider,
          private _usuario:UsuarioProvider) {
  	
  }

  siguiente_pagina(infiniteScroll){
  	this._ps.cargar_todos()
  		.then((hayMas:boolean)=>{
  			this.hayMas=hayMas;
  			infiniteScroll.complete();
  		});
  }

  irDetalle(item){
    this.navCtrl.push(ProductoPage,{'producto':item});
  }
}
