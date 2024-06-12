import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import {CarSummary, CarModel, Colors, CarConfig} from '../../model/data-model';
import {CurrencyPipe} from '@angular/common';
@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss'
})
export class StepThreeComponent {
  public carSummary:CarSummary = {} as CarSummary; 
  public extraPackage: number = 1000;
  public totalPrice = 0;

  constructor(
    private _sharedService: SharedService) {

    }
  ngOnInit(){
    if(this._sharedService.isStepTwoValid()){        
        this.carSummary.carModel = this._sharedService.getModelPreference as CarModel;
        this.carSummary.color = this._sharedService.getModelColorPreference as Colors;
        this.carSummary.carConfig = this._sharedService.getSelectedCarConfig as CarConfig;       
        this.getDetailsSummary();           
    }
  }
  getDetailsSummary(){
    const basePrice = this.carSummary.carConfig.configs[0]?.price || 0;
    const colorPrice = this.carSummary.color?.price || 0;
    const towHitchPrice = this.carSummary.carConfig?.towHitch? this.extraPackage : 0;
    const yokrPrice  = this.carSummary.carConfig?.yoke? this.extraPackage : 0;
    this.totalPrice = basePrice + colorPrice + towHitchPrice +  yokrPrice;
  }
}
