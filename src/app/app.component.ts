import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase/app';
import { config } from './credentials';

import { HomePage } from '../pages/home/home';
import { CommentsPage } from '../pages/comments/comments';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  activePage: any;

  pages: Array<{title: string, icon: string, component: any}>;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'Comments', icon: 'text', component: CommentsPage }
    ];
    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      firebase.initializeApp(config);

      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) { // Direct to login if user does not have session stored in local storage.
        this.rootPage = LoginPage;
        unsubscribe();
      } else { // If session active in local storage proceed to home screen.
        this.rootPage = HomePage;
        unsubscribe();
        }
      });
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;

  }

  checkActive(page){
    return page == this.activePage;
  }

}
