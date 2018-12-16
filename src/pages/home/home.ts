import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, Slides } from 'ionic-angular';
import { CommentApi } from '../../providers/comment-api/comment-api';
import { AddGroupPage } from '../add-group/add-group';
import { CommentsPage } from '../comments/comments';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public comments: Array<any>;
  public count: number;

@ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
  public commentApi: CommentApi) {

  }

  ionViewDidLoad(){
    const loader = this.loadingCtrl.create({
      content: 'Loading Comments',
      duration: 3000
    });
    loader.present();

// OrderByChild() orders the shops by lowest to highest loyaltyPoints,
// this order is then reversed in the html - line 29. This orders the stores most popular with that user.
    this.commentApi.getCommentList().on("value", commentListSnapshot => {
      this.comments = [];
      commentListSnapshot.forEach(snap => {
        this.comments.push({
          id: snap.key,
          comment: snap.val().comment,
          likes: snap.val().likes,
          comments: snap.val().comments,
          DatePosted: snap.val().DatePosted
        //  about: snap.val().about
        });
        return false;
      });
      this.count = this.comments.length; // count the no. of comments.
      loader.dismiss();
    });
  }

  ionViewDidEnter() {
    this.slides.autoplayDisableOnInteraction = false;
  }

  goToAddGroup(){
    this.navCtrl.push(AddGroupPage);
  }

  goToComments(){
    this.navCtrl.push(CommentsPage);
  }

}
