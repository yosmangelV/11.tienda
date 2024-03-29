import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/index.service';


@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  producto:any[];
  
  constructor(public navCtrl: NavController, 
  				public navParams: NavParams,
  				private _carrito:CarritoProvider) {

  	this.producto=this.navParams.get("producto");
  }


}
