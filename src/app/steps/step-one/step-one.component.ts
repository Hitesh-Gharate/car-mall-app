import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { SharedService } from '../../services/shared.service';
import {Subscription} from 'rxjs';
import {CarModel,ColorCode,Code, Colors} from '../../model/data-model';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss'
})
export class StepOneComponent {
  private subs!: Subscription;
  public allCarModelList: CarModel[] = [];
  public selectedmodel!: CarModel | null ;
  protected stepOneForm!: FormGroup;
  constructor(
    private _dataService: DataService,
    private _sharedService: SharedService,
    ){
      this.stepOneForm = new FormGroup({
        modelSelect: new FormControl<string>('', { nonNullable: true }),
        colorSelect: new FormControl<string>('' ,{ nonNullable: true }),
      });
  }


  ngOnInit(){
    this.getModelDetails();
  }
  updateFormValues(){
   let modelName = this._sharedService.getModelPreference?.code as Code;
   let colorCode  = this._sharedService.getModelColorPreference?.code as ColorCode;
   if(modelName &&  colorCode){
    this.stepOneForm.patchValue({
      modelSelect:modelName,
      colorSelect:colorCode
     })     
    this._sharedService.setCarImageSrc({code:modelName, color:colorCode});
    this.selectedmodel = this.allCarModelList.find((model:CarModel) => model.code === modelName) as CarModel;
   }else{
    this._sharedService.setCarImageSrc({code:null, color:null});
    this.selectedmodel =null;
   }

  }
  getModelDetails(){
    this.subs = this._dataService.getAllModels().subscribe(
      {
       next:(response:CarModel[])=>{
          this.allCarModelList = response;
          this.updateFormValues();
       },
       error:(error => console.log('Error', error)),
      } 
     )
  }
  onSelectModel(){
    let modelName: string = this.stepOneForm.controls['modelSelect'].value;
    if(modelName){
      this.selectedmodel = this.allCarModelList.find((model:CarModel) => model.code === modelName) as CarModel;
      let selectedModelColor = this.selectedmodel.colors[0] as Colors;
      this.stepOneForm.controls['colorSelect'].setValue(selectedModelColor.code);
      this._sharedService.setCarImageSrc({code:this.selectedmodel.code, color:selectedModelColor.code});
      this._sharedService.setModelPreference(this.selectedmodel);
      this._sharedService.setModelColorPreference(selectedModelColor);
      this._sharedService.setSelectedCarConfig(null);
    }
    else{
      this.selectedmodel =  null;
      this._sharedService.setSelectedCarConfig(null);
      this._sharedService.setModelPreference(null);
      this._sharedService.setModelColorPreference(null);
      this._sharedService.setCarImageSrc({code:null, color:null});
      this.stepOneForm.controls['colorSelect'].setValue('');
    }
  }
  onColorChange(){
    let colorCode = this.stepOneForm.controls['colorSelect'].value as ColorCode;
    if(colorCode){
    let selectedModelColor =  this.selectedmodel?.colors?.find(modelColor => modelColor.code === colorCode) as Colors;
    let carModel = this.selectedmodel as CarModel;
    this._sharedService.setModelColorPreference(selectedModelColor);
    this._sharedService.setCarImageSrc({code:carModel.code, color:colorCode});
    }   
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
