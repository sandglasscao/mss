import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from "@angular/router";
import {Store} from "./store";
import {StoreService} from "./store.service";

@Component({
  selector: 'app-previewImg',
  templateUrl: '../../assets/templates/dashboard/store-pics.html',
  styleUrls: ['../../assets/css/dashboard/store-pics.css']
})
export class StorePicsComponent implements OnInit {
  allowedFiles = ['bmp', "png", "gif", "jpg", "jpeg"];
  alertMsg = '文件格式仅限于' + this.allowedFiles.toString() + '格式，请重新选择';
  lbl = {
    'license_pic': "营业执照",
    'indoor_pic': "店内快照",
    'outdoor_pic': "店铺快照",
  };
  pic = {};
  keys = Object.keys(this.lbl);
  failMsg = "上传失败，请重新上传";
  errMsg = [];
  formData = new FormData();
  store: Store;
  error = null;

  constructor(private storeService: StoreService,
              private location: Location,
              private router: Router) {
  }

  ngOnInit() {
    this.store = this.storeService.getStore(sessionStorage.getItem('selected'));
    this.loadPics();
  }

  goBack(): void {
    this.location.back();
  }

  selectedPic(event, which) {
    let file = event.target.files[0];
    if (file && this.isPicture(file)) {
      let that = this;
      let reader = new FileReader();
      reader.onload = function () {
        that.pic[which] = this.result;
      };
      reader.readAsDataURL(file);
    }
    else
      this.error = file ? this.alertMsg : this.error;
  }

  upload() {
    this.setUploadFile();
    this.storeService
      .uploadPic(this.store.id, this.formData)
      .subscribe(
        res => this.fail_msg(res),
        err => this.error = "出现错误,请联系工作人员或稍后再试!"
      );
  }

  private fail_msg(store: Store) {
    this.keys.forEach(item =>
      (this.pic[item] && !store[item]) ? this.errMsg.push(item) : null);
    if (!this.errMsg.length) {
      let st = this.storeService.getStores().find(item => item.id == store.id);
      this.keys.forEach(item => st[item] = store[item]);
      this.router.navigate(['/dashboard/store', sessionStorage.getItem('selected')]);
    }
  }

  private loadPics() {
    this.keys.forEach(item => this.store[item] ? this.pic[item] = this.store[item] : null);
  }

  private setUploadFile() {
    let inputList = document.getElementsByName('pic');
    for (let i = 0; i < this.keys.length; i++) {
      let file = inputList.valueOf()[i].files.item(0);
      file ? this.formData.append(this.keys[i], file, file.name) : null;
    }
  }

  private isPicture(file: File): boolean {
    let ext = file.name.split('.')[1].toLowerCase();
    return (this.allowedFiles.indexOf(ext) >= 0);

    /*if(!/image\/\w+/.test(simpleFile.type)) {
            alert("请确保文件类型为图像类型");
            return false;
    */
  }
}
