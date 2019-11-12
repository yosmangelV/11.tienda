import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductosProvider, CarritoProvider, UsuarioProvider} from '../../providers/index.service';
//PAGES
import {  CarritoPage,
          CategoriasPage,
          LoginPage,
          OrdenesDetallePage,
          PorCategoriasPage,
          TabsPage,
          ProductoPage 
        } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {

  ordenesDetalle=OrdenesDetallePage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
  				private _carrito:CarritoProvider) {
  }

  ionViewWillEnter(){
  	this._carrito.cargar_ordenes();
  }


}
