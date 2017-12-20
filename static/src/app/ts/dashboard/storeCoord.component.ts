import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from "@angular/router";

declare var AMap: any;


@Component({
  selector: 'app-storeCoord',
  templateUrl: '../../templates/dashboard/storeCoord.html',
  styleUrls: ['../../templates/dashboard/storeCoord.css']
})

export class StoreCoordComponent implements OnInit {
  storeId: string;
  map: any;
  geolocation: any;
  private coord = {'info': '定位后可点击显示查看结果'};

  constructor(private location: Location,
              private router: Router) {
  }

  ngOnInit(): void {
    this.storeId = sessionStorage.getItem('selected');

    this.map = new AMap.Map('map');
    this.map.plugin('AMap.Geolocation', () => {
      this.geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000,          // 超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           // 定位结果缓存0毫秒，默认：0
        convert: true,           // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: false,        // 显示定位按钮，默认：true
        buttonPosition: 'LB',    // 定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        // 定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        // 定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     // 定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true     // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      this.map.addControl(this.geolocation);
      AMap.event.addListener(this.geolocation, 'complete', this.onComplete); // 返回定位信息
      AMap.event.addListener(this.geolocation, 'error', this.onError);      // 返回定位出错信息
    });

  }

  goBack(): void {
    this.location.back();
  }

  onComplete(data: any) {
    this.coord = data;
    const info = {
      'info': '定位成功',
      'coords': {'lng': data.position.getLng(), 'lat': data.position.getLat()}
    };
    sessionStorage.setItem('coordShow', JSON.stringify(info));
    sessionStorage.setItem('lng', info.coords.lng.toString());
    sessionStorage.setItem('lat', info.coords.lat.toString());
    sessionStorage.setItem('getShow', '1');
    alert('定位成功:' + '(' + info.coords.lng + ',' + info.coords.lat + ')');
  }

  onError(data: any) {
    //console.log(data.message);
    alert('定位失败:' + data.message);
  }

  getCurrentPosition() {
    this.geolocation.getCurrentPosition();
  };

  showPosition() {
    this.coord = JSON.parse(sessionStorage.getItem('coordShow'));
    //console.log(this.coord);
  }

  savePosition() {
    if (this.coord.info == '定位成功') {
      //this.location.back();
      this.router.navigate(['/dashboard/store', sessionStorage.getItem("selected")]);
      //console.log(this.router.url);
    } else {
      alert('请先定位，然后查看结果成功与否，最后再保存');
    }
  }
}
