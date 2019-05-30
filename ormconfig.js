const { EnvService } = require('./env/env.service');
require('dotenv').config();

const config = new EnvService().read();

module.exports = {
  name: 'default',
  type: config.DB_TYPE,
  host: config.DB_HOST,
  port: 5432,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: true,
  dropSchema: false,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  cli: {
    entitiesDir: 'src/**/*.entity.ts',
  },
};
