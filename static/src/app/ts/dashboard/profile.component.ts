import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService}  from './profile.service';

import {Profile} from './profile';
@Component({
    templateUrl: 'static/src/app/templates/dashboard/profile.html',
    providers: [
        ProfileService
    ]
})
export class ProfileComponent implements OnInit {
    lbls = {
        1: ['昵称', '姓名', '证件类型', '证件号码'],
        5: ['', '', '', ''],
        9: ['单位名称', '单位全称', '证照名称', '证照号码']
    };

    model = new Profile();

    isSuccess = false;

    id_name_lbl: string;    // identity name label for enterprise/orgnization
    id_no_lbl: string;  //identity number label for enterprise/orgnization
    name_lbl: string;   //full name label
    name2_lbl: string;  //nick name or shortname label of enterprise/orgnization
    error = null;

    constructor(private router: Router,
                private profileService: ProfileService) {
    }

    ngOnInit() {
        this.profileService.retrieveProfile(sessionStorage.getItem("account"))
            .then(profile => {
                /*if (profile.address)
                    sessionStorage.setItem('defaultaddress', profile.address.id.toString());
                */
                this.model = profile;
                this.set_lbls();
            })
            .catch(error => console.log(error))
    }

    onSubmit() {
        this.profileService.updateProfile(this.model)
            .then(profile => {
                this.foreward();
                this.isSuccess = true;
            })
            .catch(error => console.log(error))
    }

    private foreward() {
        //this.router.navigate([this.wizardService.nextStep(this.router.url)]);
    }

    private set_lbls() {
        /*this.name2_lbl = this.lbls[this.model.usertype][0];
        this.name_lbl = this.lbls[this.model.usertype][1];
        this.id_name_lbl = this.lbls[this.model.usertype][2];
        this.id_no_lbl = this.lbls[this.model.usertype][3];*/
    }
}

