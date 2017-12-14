import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PreviewImgService} from './previewing.service';
import {Location} from '@angular/common';
import {Router} from "@angular/router";
import {el} from "@angular/platform-browser/testing/src/browser_util";

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
  error = null;


  previewImgSrcs;
  previewImgSrcs_;

  constructor(private location: Location,
              public previewImgService: PreviewImgService,
              private router: Router) {
  }

  ngOnInit() {
    this.previewImgSrcs = [];
    this.previewImgSrcs_ = [];
    //this.pic.store_id = sessionStorage.getItem('selected');
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
    if (this.previewImgSrcs_.length >= 1) {
      return;
    }
    if (!event.target.files[0]) {
      return;
    }
    let that = this;
    this.previewImgService.readAsDataUrl(event.target.files[0]).then(function (result) {
      that.previewImgSrcs_.push(result);
    });
    console.log(this.previewImgSrcs_);
  }

  remove_(i) {
    this.previewImgSrcs_.splice(i, 1);
  }

  setfiles() {
    this.formData.append('license_pic', this.previewImgSrcs_[0]);
    this.formData.append('store_pic', this.previewImgSrcs[0]);
  }

  upload() {
    this.setfiles();
    this.previewImgService
      .uploadpic(+sessionStorage.getItem('selected'), this.formData)
      .then(res => this.check_(res))
      .catch(error => {
        // this.error = error;
        this.error = "出现错误,请联系工作人员或稍后再试!"
      });
  }
  check_(res) {
    if (res.license_pic==1 && res.store_pic==1){
      this.router.navigate(['/dashboard/store', sessionStorage.getItem('selected')]);
    }else {
      alert('1');
    }
  }
}
