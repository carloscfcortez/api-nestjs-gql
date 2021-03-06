import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
require('dotenv').config();
import * as jwt from 'jsonwebtoken';
// import { EnvService } from '../../env/env.service';

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		if (request) {
			if (!request.headers.authorization) {
				return false;
			}
			request.user = await this.validateToken(request.headers.authorization);
			return true;
		} else {
			const ctx: any = GqlExecutionContext.create(context).getContext();
			if (!ctx.headers.authorization) {
				return false;
			}
			ctx.user = await this.validateToken(ctx.headers.authorization);
			return true;
		}
	}

	async validateToken(auth: string) {
		// const config: any = new EnvService().read();

		if (auth.split(' ')[0] !== 'Bearer') {
			throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
		}
		const token = auth.split(' ')[1];

		try {
			const decoded: any = await jwt.verify(token, 'XABLAU');
			return decoded;
		} catch (err) {
			const message = 'Token error: ' + (err.message || err.name);
			throw new HttpException(message, HttpStatus.UNAUTHORIZED);
		}
	}
}
