import { Module, Global, DynamicModule } from '@nestjs/common';
import { EnvModule } from './env.module';
import { EnvService } from './env.service';
import { TypeOrmModule } from '@nestjs/typeorm';

function DatabaseOrmModule(): DynamicModule {
	const config: any = new EnvService().read();

	return TypeOrmModule.forRoot({
		type: config.DB_TYPE,
		host: config.DB_HOST,
		port: config.DB_PORT,
		username: config.DB_USER,
		password: config.DB_PASSWORD,
		database: config.DB_NAME,

		synchronize: false
	});
}

@Global()
@Module({
	imports: [ EnvModule, DatabaseOrmModule() ]
})
export class DatabaseModule {}
