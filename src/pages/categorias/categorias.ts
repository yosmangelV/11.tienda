import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from '../../providers/index.service';
import {  CarritoPage,
          HomePage,
          LoginPage,
          OrdenesPage,
          OrdenesDetallePage,
          PorCategoriasPage,
          TabsPage,
          ProductoPage 
        } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  
  constructor(public navCtrl: NavController, 
  				public navParams: NavParams,
  				public _ps:ProductosProvider) {
  }


  irCategoria(categoria){
  	console.log(categoria);
  	this.navCtrl.push(PorCategoriasPage,{'categoria':categoria});
  }

}
