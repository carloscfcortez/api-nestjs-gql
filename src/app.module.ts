import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiModule } from './api.module';
import { AppController } from './app.controller';
import { DateScalar } from './shared/date.scalar';
import { EnvModule } from '../env/env.module';
@Module({
	imports: [
		TypeOrmModule.forRoot(),
		GraphQLModule.forRoot({
			typePaths: [ './**/*.graphql' ],
			context: ({ req }) => ({ headers: req.headers })
		}),
		EnvModule,
		ApiModule
	],
	controllers: [ AppController ],
	providers: [ DateScalar ]
})
export class AppModule {}
