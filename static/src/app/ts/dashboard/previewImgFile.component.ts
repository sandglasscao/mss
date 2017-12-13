import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PreviewImgService} from './previewing.service';
import {Location} from '@angular/common';
import {Pic} from "./pic";

@Component({
  selector: 'app-previewImg',
  templateUrl: 'static/src/app/templates/dashboard/previewImgFile.html',
  styleUrls: ['static/src/app/templates/dashboard/previewImgFile.css']
})
export class PreviewImgComponent implements OnInit {
  formData = new FormData();

  //@Input()
  //previewImgFile;
  //@Output()
  //previewImgFileChange: EventEmitter<string> = new EventEmitter();
  pic = new Pic();
  error = null;


  previewImgSrcs;
  previewImgSrcs_;

  constructor(private location: Location,
              public previewImgService: PreviewImgService) {
  }

  ngOnInit() {
    this.previewImgSrcs = [];
    this.previewImgSrcs_ = [];
  }

  goBack(): void {
    this.location.back();
  }

  previewPic(event) {
    if (this.previewImgSrcs.length >= 1) {
      return;
    }
    if (!event.target.files[0]) {
      return;
    }
    let that = this;
    this.previewImgService.readAsDataUrl(event.target.files[0]).then(function (result) {
      that.previewImgSrcs.push(result);
      that.pic.username = that.previewImgSrcs[0];
      //let file = event.target.files[0];
      //that.previewImgFile.push(file);
      //that.previewImgFileChange.emit(that.previewImgFile);
    });
    console.log(this.previewImgSrcs);
    console.log(this.pic);
  }

  remove(i) {
    this.previewImgSrcs.splice(i, 1);
    //this.previewImgFile.splice(i, 1);
  }

  previewPic_(event) {
    if (this.previewImgSrcs_.length >= 1) {
      return;
    }
    if (!event.target.files[0]) {
      return;
    }
    let that = this;
    this.previewImgService.readAsDataUrl(event.target.files[0]).then(function (result) {
      that.previewImgSrcs_.push(result);
      that.pic.license = that.previewImgSrcs_[0];
      //let file = event.target.files[0];
      //that.previewImgFile.push(file);
      //that.previewImgFileChange.emit(that.previewImgFile);
    });
    console.log(this.previewImgSrcs_);
    console.log(this.pic);
  }

  remove_(i) {
    this.previewImgSrcs_.splice(i, 1);
    //this.previewImgFile.splice(i, 1);
  }

  setfiles() {
    
  }

  upload() {
    this.setfiles();
    this.previewImgService
      .uploadpic(+sessionStorage.getItem('selected'), this.formData)
      .catch(error => {
        // this.error = error;
        this.error = "出现错误,请联系工作人员或稍后再试!"
      });
  }
}
