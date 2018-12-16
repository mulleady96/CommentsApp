import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuth } from 'angularFire2/auth';
import { AngularFireModule } from 'angularfire2';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommentsPage } from '../pages/comments/comments';
import { CommentApi } from '../providers/comment-api/comment-api';
import { AuthProvider } from '../providers/auth/auth';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { CommentThreadPage } from '../pages/comment-thread/comment-thread';
import { config } from './credentials';
import { AddGroupPage } from '../pages/add-group/add-group';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    AddGroupPage,
    SignUpPage,
    CommentThreadPage,
    CommentsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config), // inits use of angularfire modules.
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    AddGroupPage,
    SignUpPage,
    CommentThreadPage,
    CommentsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommentApi,
    AuthProvider
  ]
})
export class AppModule {}
