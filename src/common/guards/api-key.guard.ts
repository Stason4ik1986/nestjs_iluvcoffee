import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { Observable } from 'rxjs';
import { Request } from 'express';

import { IS_PUBLIC_KEY } from '../../common';

@Injectable()
export class ApiKeyGuard implements CanActivate {

  constructor(
    private readonly _reflector: Reflector,
    private readonly _configService: ConfigService,
  ) { }

  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this._reflector.get(IS_PUBLIC_KEY, ctx.getHandler());

    if (isPublic) {
      return true;
    }

    const request = ctx.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');

    return authHeader === this._configService.get('API_KEY');
  }
}
