import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController,Platform, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { UsuarioProvider } from "../usuario/usuario";
import { LoginPage, CarritoPage} from "../../pages/index.paginas";

@Injectable()
export class CarritoProvider {
  
  items:any[]=[];
  total_carrito:number=0;
  ordenes:any[]=[];

  constructor(public http: Http,
  				public alertCtrl:AlertController,
  				private platform:Platform,
  				private storage: Storage,
  				private _usuario:UsuarioProvider,
  				public _modal:ModalController) {
   	this.cargar_storage();
   	this.actualizar_total();
  }

  ver_carrito(){
  	let modal:any;
  	if(this._usuario.token){
  		modal=this._modal.create(CarritoPage);
  	}else{
  		modal=this._modal.create(LoginPage);
  	}
  	modal.present();
  	
  	modal.onDidDismiss((abrirCarrito:boolean)=>{
  		if(abrirCarrito){
  			this._modal.create(CarritoPage).present();
  		}
  	});
  }

  remove_item(idx:number){
    this.items.splice(idx,1);
    this.guardar_storage();
  }

  realizar_pedido(){
    let data=new URLSearchParams();
    let codigos:string[]=[];

    for(let item of this.items){
      codigos.push(item.codigo);
    }

    data.append("items",codigos.join(","));

    let url=`${URL_SERVICIOS}orden_compra/${this._usuario.token}/${this._usuario.id_usuario}`;

    this.http.post(url,data).subscribe(resp=>{
      let respuesta=resp.json();
      console.log(resp);
      if(respuesta['error']){
        this.alertCtrl.create({
          title:"Error en la orden",
          subTitle:respuesta['mensaje'],
          buttons:["OK"]
        }).present();
      }else{
        this.items=[];
        this.alertCtrl.create({
          title:"Orden realizada!",
          subTitle:"Nos contactaremos con usted proximamente",
          buttons:["OK"]
        }).present();
        this.guardar_storage();
      }

    });
  }

  agregar_carrito(item_parametro:any){
	  	for(let item of this.items){
	  		if(item.codigo== item_parametro.codigo){
	  			this.alertCtrl.create({
	  				title:"Item ya existe",
	  				subTitle:item_parametro.producto +", ya se encuentra en su carrito de compras.",
	  				buttons:['OK']
	  			}).present();
	  			return;
	  		}
	  	}

	  	this.items.push(item_parametro);
	  	this.actualizar_total();
	  	this.guardar_storage();
	  	console.log(this.items);
  }


  private guardar_storage(){
	  	if(this.platform.is("cordova")){
	  		this.storage.set('items',this.items);
	  	}else{
	  		localStorage.setItem("items", JSON.stringify(this.items));
	  	}
  }

  actualizar_total(){
  	this.total_carrito=0;
  	for(let item of this.items){
  		this.total_carrito+=Number(item.precio_compra);
  	}
  }

  cargar_storage(){
		let promesa = new Promise((resolve,reject)=>{
		  		if(this.platform.is("cordova")){
		  			this.storage.ready().then(()=>{
		  				this.storage.get("items").then(items=>{
		  					if(items){
		  						this.items=items;
		  						resolve();
		  					}
		  				});
		  			});
		  		}else{
		  			if(localStorage.getItem('items')){
		  				this.items=JSON.parse(localStorage.getItem('items'));
		  			}
		  			resolve();
		  		}	
		  	});
		return promesa;	  	
  }

  cargar_ordenes(){
    let url=`${URL_SERVICIOS}orden/${this._usuario.token}/${this._usuario.id_usuario}`;

    this.http.get(url)
        .map(resp=>resp.json())
        .subscribe(data=>{
          if(data["error"]){
            this.alertCtrl.create({
              title:"Error",
              subTitle:data["mensaje"],
              buttons:["OK"]
            }).present();
          }else{
            this.ordenes=data['ordenes'];
          }
        });

  }

  borrar_orden(orden_id:string){
    let url=`${URL_SERVICIOS}eliminar_orden/${this._usuario.token}/${this._usuario.id_usuario}/${orden_id}`;
    let data=new URLSearchParams();
    return this.http.post(url,data)
              .map(resp=>resp);
  }
}
