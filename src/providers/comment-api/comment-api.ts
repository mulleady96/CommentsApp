import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

@Injectable()
export class CommentApi {

  public commentListRef: firebase.database.Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
  if (user) {
    this.commentListRef = firebase
      .database()
      .ref(`/userProfile/${user.uid}/commentList`); // Your list of comments.
      // TODO: Create universal comments list.
        }
    });
  }

  getCommentList(): firebase.database.Reference { // Return ShopList for a specific user.
    return this.commentListRef;
  }

  getCommentDetail(commentId: string): firebase.database.Reference { // Retrive details about the shop
    return this.commentListRef.child(`${commentId}`);
  }

  likesButton(commentId: string){
    return this.commentListRef.child(`${commentId}`).transaction(event => {
      event.likes += 1;
      return event;
    });
  }

  dislikesButton(commentId: string){
    return this.commentListRef.child(`${commentId}`).transaction(event => {
      event.likes -= 1;
      return event;
    });
  }

  deleteComment(commentId: string){

  }

  getCommentThread(commentId: string){
    return this.commentListRef.child(`${commentId}/commentThread`)
  }

  createCommentThread(commentId: string, comments: string, likes: number){
    // Inside Comments on an original comment post.
    return this.commentListRef.child(`${commentId}/commentThread`).push({
    comments: comments,
    likes: likes * 1,
    DatePosted: Date()
  });
  }

  createComment(comment: string, likes: number, comments: string): firebase.database.ThenableReference {//Add new card to the top most array. i.e. the shopList array.
    return this.commentListRef.push({
      comment:  comment,
      likes: likes * 1,
      comments: comments,
      DatePosted: Date()
    });
  }

}
