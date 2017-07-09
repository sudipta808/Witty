import { Component } from "@angular/core";
import { ModalController } from "ionic-angular";
import { ModalOptions } from "../modal-options/modal-options";

@Component({
    selector: "upload-image",
    templateUrl: "upload.html"
})

export class Upload {
    private uploadStuff: any[];
    private isShowUploadButton: boolean;
    constructor(public modalCtrl: ModalController){}

    ionViewWillEnter() {
        if(this.uploadStuff)
            this.isShowUploadButton = false;
        else
            this.isShowUploadButton = true;
    }

    public showOptions($event) {
        var config = {
            enableBackdropDismiss: false,
            showBackdrop: true
        }

        let optionsModal = this.modalCtrl.create(ModalOptions, {}, config);

        optionsModal.onDidDismiss(data => {
            console.log("Data: ", data);
        });

        optionsModal.present();        
    }

    
}