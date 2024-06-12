import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { SharedService } from '../../services/shared.service';
import {Subscription} from 'rxjs';
import {CarConfig, CarDetails} from '../../model/data-model';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss'
})
export class StepTwoComponent {
  protected carConfig!: CarConfig | null;
  protected stepTwoForm!: FormGroup;
  protected selectedOption!: CarDetails | null;
  private subs!: Subscription;
  constructor(
    private _dataService: DataService,
    private _sharedService: SharedService
    ){
      this.stepTwoForm = new FormGroup({
        carOption: new FormControl<string>('', { nonNullable: true }),
        yoke: new FormControl<boolean>( false,{ nonNullable: true }),
        towHitch: new FormControl<boolean>(false ,{ nonNullable: true })
      });
  }
  ngOnInit(){
    if(this._sharedService.isStepOneValid()){        
      this.getSelectedModelConfig();
    }
  }
  getSelectedModelConfig(){
    let model = this._sharedService.getModelPreference;
    if(model){
      this.subs = this._dataService.getSelectedModelConfig(model).subscribe({
        next:(((config: CarConfig) => {
            this.carConfig = config;
            this.setDefaultCarDetails();
        })),
        error:(error => console.log('Error', error))
      })
    }
  }
  setDefaultCarDetails(){
      let isModelSelected = this._sharedService.getSelectedCarConfig;
      let carConfigModel = isModelSelected || this.carConfig || null;
      if(isModelSelected){
        this.selectedOption = isModelSelected.configs[0]?? null; 
        }else{          
        this.selectedOption = this.carConfig?.configs[0]?? null; 
      }
      if(carConfigModel){
        this.stepTwoForm.patchValue({
          carOption: this.selectedOption?.id,
          yoke: carConfigModel?.yoke,
          towHitch: carConfigModel?.towHitch
         });
      }
      this.setSelectedCarConfig();
  }
  onSelectConfig(){
    let carOption: string = this.stepTwoForm.controls['carOption'].value;
    if(carOption){
      this.selectedOption = this.carConfig?.configs.find((model:CarDetails) => model.id === Number(carOption)) as CarDetails;     
    }
    else{
      this.selectedOption =  null;
    }
  } 
  setSelectedCarConfig(){
    const {yoke, towHitch } = this.stepTwoForm.value; 
    const config =  this.selectedOption || {} as CarDetails;
    const selectedCarConfig ={
     configs:[config],
     yoke: yoke,
     towHitch:towHitch 
    }
    this._sharedService.setSelectedCarConfig(selectedCarConfig);
  }
  ngOnDestroy(){
    this.setSelectedCarConfig();
    this.subs.unsubscribe();
  }
}
