import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/AuthService";

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredPermission = route.data['requiredPermission'] as string;

    if (this.authService.userPermissions.includes(requiredPermission)) {
      return true;
    } else {
      // Redirect to a forbidden page or show an error message
      this.router.navigate(['/']);
      return false;
    }
  }
}
