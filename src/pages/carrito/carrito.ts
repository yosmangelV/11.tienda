import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CarritoProvider } from "../../providers/index.service";

@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  				private _carrito:CarritoProvider,
  				public viewCtrl:ViewController) {
  }

  

}
