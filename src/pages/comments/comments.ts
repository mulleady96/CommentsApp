import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, Loading, LoadingController, ToastController, AlertController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentApi } from '../../providers/comment-api/comment-api';
import { CommentModalPage } from '../comment-modal/comment-modal';
import { CommentThreadPage } from '../comment-thread/comment-thread';

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  public createCommentForm: FormGroup;
  public MaxLength: number = 200;
  public remaining: number = 200;
  public comments: Array<any>;
  public count: number;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
  public alertCtrl: AlertController, public toastCtrl: ToastController,
  public commentApi: CommentApi, public modal: ModalController) {
    this.createCommentForm = formBuilder.group({
      comment: ['', Validators.required],
    });
    this.commentApi.getCommentList();
  }



  ionViewDidLoad(){ // when page is loaded, presents loading controller, if content ready to be displayed then the loadingCtrl is dismissed.
    console.log('hello');
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

  onTextarea(text: Object){
    // Calculates characters remaining in textarea field.
    this.remaining = this.MaxLength - Object.keys(text).length;
  //  console.log(text);
}

  likesButton(commentId: string){
    //1. click on like button updates the likes count
    this.commentApi.likesButton(commentId);
  }

  dislikesButton(commentId: string){
    this.commentApi.dislikesButton(commentId);
  }

  // commentButton(commentId: string): void {
  //   //2. click on comments button to open modal to say something about the initial comment.
  //   const commentModal = this.modal.create('CommentModalPage', this.comments);
  //   this.navCtrl.push('CommentModalPage', {commentId: commentId});
  //   commentModal.present();
  // }

  commentButton(commentId: string){
    this.navCtrl.push(CommentThreadPage, {commentId: commentId})
  }


  createComment(){
    // 1. Loading Component
    const loading: Loading = this.loadingCtrl.create();
    loading.present();


    const comment = this.createCommentForm.value.comment;
    const likes = 0;
    const comments = '';



    this.commentApi.createComment(comment, likes, comments)
    .then( // Passing this form data to the shopApi provider.
      () => {
        loading.dismiss().then(() => { // success = return to previous home page
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
      },
      error => {
        loading.dismiss().then(() => { // Fail = Show user friendly error.
          const alert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }],
          });
          alert.present();
        });
    });
  }

}
