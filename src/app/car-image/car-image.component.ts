import { Component } from '@angular/core';
import { SharedService } from "../services/shared.service";

@Component({
  selector: 'app-car-image',
  standalone: true,
  imports: [],
  templateUrl: './car-image.component.html',
  styleUrl: './car-image.component.scss'
})
export class CarImageComponent {
  constructor(protected _sharedService: SharedService){

  }
  ngOnInit(){

  }
}
