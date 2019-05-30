import { Controller, Get, Logger, Post, Param, Body, Delete, Put, UsePipes, UseGuards, Query } from '@nestjs/common';

import { User } from '../user/user.decorator';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from '../shared/auth.gaurd';
import { AccountService } from '../account/account.service';
import { AccountDTO } from '../account/account.dto';

@Controller('api/accounts')
export class AccountController {
	private logger = new Logger('AccountController');

	constructor(private accountService: AccountService) {}

	private logData(options: any) {
		options.user && this.logger.log('USER ' + JSON.stringify(options.user));
		options.body && this.logger.log('BODY ' + JSON.stringify(options.body));
		options.id && this.logger.log('ACCOUNT ' + JSON.stringify(options.id));
	}

	@Get()
	@UseGuards(new AuthGuard())
	showAllAccounts(@Query('page') page: number) {
		return this.accountService.showAll(page);
	}

	@Get('/newest')
	@UseGuards(new AuthGuard())
	showNewestAccounts(@Query('page') page: number) {
		return this.accountService.showAll(page, true);
	}

	@Post()
	@UseGuards(new AuthGuard())
	@UsePipes(new ValidationPipe())
	crateAccount(@User('id') user: any, @Body() body: AccountDTO) {
		this.logData({ user, body });
		return this.accountService.create(user, body);
	}

	@Get(':id')
	readAccount(@Param('id') id: string) {
		this.logData({ id });
		return this.accountService.read(id);
	}

	@Put(':id')
	@UseGuards(new AuthGuard())
	@UsePipes(new ValidationPipe())
	updateAccount(@Param('id') id: string, @User('id') user: any, @Body() body: Partial<AccountDTO>) {
		this.logData({ id, user, body });
		return this.accountService.update(id, user, body);
	}

	@Delete(':id')
	@UseGuards(new AuthGuard())
	destroyAccount(@Param('id') id: string, @User('id') user: any) {
		this.logData({ id, user });
		return this.accountService.destroy(id, user);
	}
}
