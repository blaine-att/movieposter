import { MenuPage } from './../pages/menu/menu';
import { HomePage } from './../pages/home/home';
import { Component, ViewChild } from '@angular/core';

import { Nav, Platform } from 'ionic-angular';


@Component({
  templateUrl: 'app.template.html'
  
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  constructor(
  ) {

  }

}
