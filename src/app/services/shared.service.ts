import { Injectable, signal, computed } from '@angular/core';
import { CarModel, CarImg, Colors, CarConfig } from '../model/data-model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private carImageSrc = signal<CarImg>({code: null, color: null});
  private imgPath = "https://interstate21.com/tesla-app/images/";
  private modelPreference!: CarModel | null;
  private modelColorPreference!: Colors | null;
  private selectedCarConfig!: CarConfig | null;
  public imageSrc = computed<string>(() => {
    if(this.carImageSrc().code && this.carImageSrc().color){
         return `${this.imgPath}${this.carImageSrc().code +'/'+this.carImageSrc().color}.jpg`;        
    }else{      
      return '';
    }
  })  

  isStepOneValid(){
      return !!(this.getModelPreference && this.getModelColorPreference )
  }
  isStepTwoValid(){
    return this.isStepOneValid() && !!(this.getSelectedCarConfig);
  }
  setCarImageSrc(src:CarImg): void{
    this.carImageSrc.set(src);
  }
  setModelPreference(carModel: CarModel | null){
    if(carModel){        
      this.modelPreference = {...carModel};
    }else{
      this.modelPreference =null;
    }
  }
  setModelColorPreference(carModelColor: Colors | null){
    if(carModelColor){        
      this.modelColorPreference = {...carModelColor};
    }else{
      this.modelColorPreference =null;
    }
  }
  setSelectedCarConfig(carConfig: CarConfig | null){
    if(carConfig){        
      this.selectedCarConfig = {...carConfig};
    }else{
      this.selectedCarConfig =null;
    }
  }
  get getModelPreference(): CarModel | null{
    return this.modelPreference;
  }
  get getModelColorPreference(): Colors | null{
     return this.modelColorPreference 
  }
  get getSelectedCarConfig(): CarConfig | null{
    return this.selectedCarConfig 
 }
}
