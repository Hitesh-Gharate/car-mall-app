import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import {inject} from '@angular/core';


export const stepTwoGuard: CanActivateFn = (route, state) => {
  const _sharedService = inject(SharedService);
  const  router:Router = inject(Router); 
  if(_sharedService.isStepOneValid()){
    return true;
  }
  else{    
    router.navigate(['/step-first'])
    return false
  }
};

export const stepThreeGuard: CanActivateFn = (route, state) => {
  const _sharedService = inject(SharedService);
  const  router = inject(Router);
  if(_sharedService.isStepTwoValid() ){
    return true;
  }
  else{    
    router.navigate(['/step-first'])
    return false
  }
};
