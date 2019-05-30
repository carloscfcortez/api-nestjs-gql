import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AccountEntity } from '../account/account.entity';
import { InstituitionEntity } from '../instituition/instituition.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { InstituitionService } from '../instituition/instituition.service';

@Module({
	imports: [ TypeOrmModule.forFeature([ AccountEntity, InstituitionEntity, UserEntity ]) ],
	controllers: [ AccountController ],
	providers: [ AccountService, AccountResolver, InstituitionService, UserService ]
})
export class AccountModule {}
