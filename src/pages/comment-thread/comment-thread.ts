import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { CommentApi } from '../../providers/comment-api/comment-api';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-comment-thread',
  templateUrl: 'comment-thread.html',
})
export class CommentThreadPage {

  public currentComment: any = {};
  public createCommentFormThread: FormGroup;
  public replies: Array<any>;

  public ShowReplies = false;

  public MaxLength: number = 200;
  public remaining: number = 200;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public commentApi: CommentApi, public formBuilder: FormBuilder,
  public loading: LoadingController, public alertCtrl: AlertController,
  public toastCtrl: ToastController) {
    this.commentApi.getCommentDetail(this.navParams.get("commentId")) /** clicking on a shop, pass the correct id into the shop view. showing the correct index of the shopList array.*/
  .on("value", commentSnapshot => {
    this.currentComment = commentSnapshot.val();
    this.currentComment.id = commentSnapshot.key;
  }),
  this.createCommentFormThread = formBuilder.group({
    comments: ['', Validators.required],
  });
  this.commentApi.getCommentList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentThreadPage');
  }

  createCommentThread(){
    const comments = this.createCommentFormThread.value.comments;
    const likes = 0;

    this.commentApi.createCommentThread(this.currentComment.id, comments, likes)
    .then( // Passing this form data to the shopApi provider.
      () => {
    //  const comments = this.createCommentFormThread.value.comments;

        // success = return to previous home page
        //  this.navCtrl.pop();
          let toast = this.toastCtrl.create({
            message: 'New Comment Added',
            duration: 3000,
            position: 'bottom'
          });
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
          toast.present();
        });
  }

  onTextarea(text: Object){
    // Calculates characters remaining in textarea field.
    this.remaining = this.MaxLength - Object.keys(text).length;
}

showReplies(commentId: string){
  this.commentApi.getCommentThread(this.navParams.get("commentId")).on("value", repliesSnapshot => {
    this.replies = [];
    repliesSnapshot.forEach(snap => {
      this.replies.push({
        id: snap.key,
        comments: snap.val().comments,
        datePosted: snap.val().DatePosted
      });
      return false;
    });
    console.log("Replies List: ", this.replies);

  });
}

}
