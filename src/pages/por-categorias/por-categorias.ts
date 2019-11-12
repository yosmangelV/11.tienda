import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from '../../providers/index.service';
import { HttpClientModule } from '@angular/common/http';
//PAGES
import {  CarritoPage,
          CategoriasPage,
          LoginPage,
          OrdenesPage,
          OrdenesDetallePage,
          TabsPage,
          ProductoPage 
        } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {

  hayMas:boolean=true;
  categoria:any;

  constructor(public navCtrl: NavController, 
  				public navParams: NavParams,
  				public _ps:ProductosProvider) {

  	this.categoria=this.navParams.get('categoria');
  	console.log(this.categoria);
  	this._ps.cargar_por_categoria(this.categoria.id);
  }

  siguiente_pagina(infiniteScroll){
  	console.log("siguiente");
  	this._ps.cargar_por_categoria(this.categoria.id)
  		.then((hayMas:boolean)=>{
  			this.hayMas=hayMas;
  			infiniteScroll.complete();
  		});
  }

  irDetalle(item){
    this.navCtrl.push(ProductoPage,{'producto':item});
  }

}
