import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvData {
	// application
	APP_ENV: string;
	APP_DEBUG: boolean;

	// database
	DB_TYPE: 'mysql' | 'mariadb' | 'mssql' | 'postgres';
	DB_HOST?: string;
	DB_NAME: string;
	DB_PORT?: number;
	DB_USER: string;
	DB_PASSWORD: string;
}

export class EnvService {
	private vars: EnvData;

	constructor() {
		const environment = process.env.NODE_ENV || 'development';
		const envString = environment.trim();
		const data: EnvData = dotenv.parse(fs.readFileSync(`${envString}.env`));
		data.APP_ENV = environment;
		data.APP_DEBUG = data.APP_DEBUG === true ? true : false;
		data.DB_PORT = data.DB_PORT;

		this.vars = data as EnvData;
	}

	read(): EnvData {
		return this.vars;
	}

	isDev(): boolean {
		return this.vars.APP_ENV === 'development';
	}

	isProd(): boolean {
		return this.vars.APP_ENV === 'production';
	}

	isTest(): boolean {
		return this.vars.APP_ENV === 'test';
	}
}
