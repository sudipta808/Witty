import { Component } from '@angular/core';
import { ViewController } from "ionic-angular";
import { CardDataService } from "../services/card-data-service";
import { ImgLoader, ImageLoaderConfig } from "ionic-image-loader";

@Component({
    selector: 'custom-card',
    templateUrl: 'custom-card.html',
    providers: [CardDataService]
})

export class CustomCardComponent {
    private cardDataSource: any[];
    constructor(private viewController: ViewController,
                private cardDataService: CardDataService,
                private imageLoaderConfig: ImageLoaderConfig) {
        this.loadCardData();

        imageLoaderConfig.enableSpinner(true);
        imageLoaderConfig.setConcurrency(10);
        this.imageLoaderConfig.setFallbackUrl('assets/img/logo.png');
    }

    public loadCardData(categoryId?: number): void {
        this.cardDataService.getCategoryDataById(1)
                            .subscribe(response => {
                                if(response) {
                                    let categoryData = response.data;
                                    this.cardDataSource = categoryData.wittyList;
                                }
                            });
    }

    onImageLoad(imgLoader: ImgLoader) {
        
    }
}