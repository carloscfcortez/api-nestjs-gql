import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../shared/auth.gaurd';
import { AccountService } from './account.service';
import { AccountDTO } from './account.dto';

@Resolver('Account')
export class AccountResolver {
	constructor(private accountService: AccountService) {}

	@Query()
	@UseGuards(new AuthGuard())
	async accounts(@Args('page') page: number, @Args('newest') newest: boolean, @Context('user') user: any) {
		const { id: userId } = user;
		return await this.accountService.showAll(page, newest, userId);
	}

	@Query()
	@UseGuards(new AuthGuard())
	async account(@Args('id') id: string) {
		return await this.accountService.read(id);
	}

	@Mutation()
	@UseGuards(new AuthGuard())
	async createAccount(
		@Args('id') id: string,
		@Args() { name, description, instituition, initialAmount, archived, accountType }: AccountDTO,
		@Context('user') user: any
	) {
		const { id: userId } = user;
		const data = { name, description, instituition, initialAmount, archived, accountType };
		return await this.accountService.create(userId, data);
	}

	@Mutation()
	@UseGuards(new AuthGuard())
	async updateAccount(
		@Args('id') id: string,
		@Args() { name, description, instituition, initialAmount, archived, accountType }: AccountDTO,
		@Context('user') user: any
	) {
		const { id: userId } = user;
		let data: any = {};
		name && (data.name = name);
		description && (data.description = description);
		initialAmount && (data.initialAmount = initialAmount);
		archived && (data.archived = archived);
		accountType && (data.accountType = accountType);
		instituition && (data.instituition = instituition);
		return await this.accountService.update(id, userId, data);
	}

	@Mutation()
	@UseGuards(new AuthGuard())
	async deleteAccount(@Args('id') id: string, @Context('user') user: any) {
		const { id: userId } = user;
		return await this.accountService.destroy(id, userId);
	}
}
