import { Component } from '@angular/core';
import { RouterLink ,RouterLinkActive } from '@angular/router';
import {SharedService} from '../services/shared.service';
import{ NgClass} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    public _sharedService:SharedService
  ){

  }

}
