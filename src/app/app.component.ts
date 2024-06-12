import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {CarImageComponent} from './car-image/car-image.component';
import {RouterOutlet} from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe,RouterOutlet, HeaderComponent,CarImageComponent],
  templateUrl:"./app.component.html" ,
})
export class AppComponent {
  name = 'Angular';

}
