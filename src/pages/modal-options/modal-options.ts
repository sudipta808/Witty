import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
    selector: "modal-options",
    templateUrl: "modal-options.html"
})

export class ModalOptions {
    private userSelection: any;
    constructor(public viewCtrl: ViewController) {
        
    }

    public openCamera() {

    }

    public openGallery() {
        
    }

    public dismissModal(selectedObject) {
        this.viewCtrl.dismiss(selectedObject);
    }
}