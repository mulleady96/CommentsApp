import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { CommentApi } from '../../providers/comment-api/comment-api';


@IonicPage()
@Component({
  selector: 'page-comment-modal',
  templateUrl: 'comment-modal.html',
})
export class CommentModalPage {

  public currentComment: any = {};


  constructor(public navParams: NavParams, public commentApi: CommentApi,
  public view: ViewController, ) {

  }

  ionViewWillLoad() {
    //const comments = this.navParams.get('comments')

    console.log('ionViewDidLoad CommentModalPage');
  }

  closeModal(){
    this.view.dismiss();
  }

}
