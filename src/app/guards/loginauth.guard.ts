import {inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";


export const loginauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // console.log('canActivate')
  // this.router.navigate(['configuration'])

  // TODO Have to add checking for expired token
  // if (localStorage.hasOwnProperty("token") && localStorage.getItem("token") !== '') {
  //   router.navigate(['/']);
  //   return false;
  // } else {
  //   return true;
  // }

  return true;

  // localStorage.setItem('item1', 'value1'); //  localStorage se pamti na nivou brauzera
  // console.log(localStorage.getItem('item1'));
  // // localStorage.removeItem('item1');
  //
  // return true;
}
