import { CanActivateFn } from '@angular/router';

export const canActivatechildGuard: CanActivateFn = (route, state) => {
  return true;
};
