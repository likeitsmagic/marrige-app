import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Permission } from 'src/users/enums/permissions/permission.enum';

@Injectable()
export class PermissionAuthGuard implements CanActivate {
  private readonly logger = new Logger(PermissionAuthGuard.name);

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    const permissions = this.reflector.get<Permission[]>(
      'permissions',
      context.getHandler(),
    );

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      if (payload.permissions.includes(Permission.SUPER_ADMIN)) {
        request['user'] = { id: payload.sub, ...payload };
        return true;
      }

      if (!payload.permissions.includes(permissions)) {
        throw new ForbiddenException();
      }

      request['user'] = { id: payload.sub, ...payload };
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
