import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarModel, CarConfig } from '../model/data-model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { } 

  getAllModels() : Observable<CarModel[]> {
    return  this._http.get<CarModel[]>('/models');
  }

  getSelectedModelConfig(carModel: CarModel): Observable<CarConfig> {
    return  this._http.get<CarConfig>('/options/'+carModel.code);
  }

}
