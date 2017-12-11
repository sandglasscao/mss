import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PreviewImgService} from './previewing.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-previewImg',
  templateUrl: 'static/src/app/templates/dashboard/previewImgFile.html',
  styleUrls: ['static/src/app/templates/dashboard/previewImgFile.css']
})
export class PreviewImgComponent implements OnInit {

  //@Input()
  //previewImgFile;
  //@Output()
  //previewImgFileChange: EventEmitter<string> = new EventEmitter();

  previewImgSrcs;
  previewImgSrcs_;

  constructor(private location: Location,
              public previewImgService: PreviewImgService) { }

  ngOnInit() {
    this.previewImgSrcs = [];
    this.previewImgSrcs_ = [];
  }
  goBack(): void {
    this.location.back();
  }
  previewPic(event) {
    if (this.previewImgSrcs.length>=3){
      alert('店铺照片不可以多于3张');
      return;
    }
    if (!event.target.files[0]) {
      return;
    }
    let that = this;
    this.previewImgService.readAsDataUrl(event.target.files[0]).then(function(result) {
      that.previewImgSrcs.push(result);
      //let file = event.target.files[0];
      //that.previewImgFile.push(file);
      //that.previewImgFileChange.emit(that.previewImgFile);
    });
    console.log(this.previewImgSrcs);
  }
  remove(i) {
    this.previewImgSrcs.splice(i, 1);
    //this.previewImgFile.splice(i, 1);
  }
  previewPic_(event) {
    if (this.previewImgSrcs_.length>1){
      alert('店铺照片不可以多于3张');
      return;
    }
    if (!event.target.files[0]) {
      return;
    }
    let that = this;
    this.previewImgService.readAsDataUrl(event.target.files[0]).then(function(result) {
      that.previewImgSrcs_.push(result);
      //let file = event.target.files[0];
      //that.previewImgFile.push(file);
      //that.previewImgFileChange.emit(that.previewImgFile);
    });
    console.log(this.previewImgSrcs_);
  }
  remove_(i) {
    this.previewImgSrcs_.splice(i, 1);
    //this.previewImgFile.splice(i, 1);
  }
}
