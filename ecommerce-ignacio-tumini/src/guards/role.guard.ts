import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/utils/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    //Obtenemos el 'Rol' desde la metadata del request
    const requestRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hashRole = () =>
      requestRoles.some((role) => user?.role?.includes(role));
    const valid = user && user.role && hashRole();

    if (!valid) throw new ForbiddenException('No tiene permisos');
    return valid;
  }
}
