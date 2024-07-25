import {inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";


export const newauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // console.log('canActivate')
  // this.router.navigate(['configuration'])

  if (!localStorage.hasOwnProperty("token") || localStorage.getItem("token") === '') {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }

  // localStorage.setItem('item1', 'value1'); //  localStorage se pamti na nivou brauzera
  // console.log(localStorage.getItem('item1'));
  // // localStorage.removeItem('item1');
  //
  // return true;
}
