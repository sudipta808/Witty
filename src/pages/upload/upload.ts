import { Component } from "@angular/core";

@Component({
    selector: "upload-image",
    templateUrl: "upload.html"
})

export class Upload {
    constructor(){}

    ionViewWillEnter() {
        console.log("Upload view");
    }
}