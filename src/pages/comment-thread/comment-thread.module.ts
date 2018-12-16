import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentThreadPage } from './comment-thread';

@NgModule({
  declarations: [
    CommentThreadPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentThreadPage),
  ],
})
export class CommentThreadPageModule {}
