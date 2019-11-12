import { Component } from '@angular/core';
//PAGES
import {  HomePage,
          CategoriasPage,
          OrdenesPage,
        } from '../index.paginas';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tabHome=HomePage;
  tabCategorias=CategoriasPage;
  tabOrdenes=OrdenesPage;

}
