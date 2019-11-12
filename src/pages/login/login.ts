import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UsuarioProvider } from "../../providers/index.service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  correo:string="";
  contrasena:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,
  				public viewCtrl:ViewController,
  				private _usuario:UsuarioProvider) {
  }


  ingresar(){
  	this._usuario.ingresar(this.correo, this.contrasena)
  					.subscribe(()=>{
  						if(this._usuario.activo()){
                this.viewCtrl.dismiss(true);
              }
  					});
  }
}
