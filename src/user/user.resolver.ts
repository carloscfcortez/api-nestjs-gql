import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../shared/auth.gaurd';
import { UserService } from './user.service';
import { UserDTO, UserRegisterDTO } from './user.dto';

@Resolver()
export class UserResolver {
	constructor(private userService: UserService) {}

	@Query()
	async users(@Args('page') page: number) {
		return await this.userService.showAll(page);
	}

	@Query()
	async user(@Args('email') email: string) {
		return await this.userService.read(email);
	}

	@Query()
	@UseGuards(new AuthGuard())
	async whoami(@Context('user') user: any) {
		const { email } = user;
		return await this.userService.read(email);
	}

	@Mutation()
	async login(@Args('email') email: string, @Args('password') password: string) {
		const user: UserDTO = { email, password };
		return await this.userService.login(user);
	}

	@Mutation()
	async register(
		@Args('email') email: string,
		@Args('password') password: string,
		@Args('name') name: string,
		@Args('lastname') lastname: string
	) {
		const user: UserRegisterDTO = { email, password, name, lastname };
		return await this.userService.register(user);
	}
}
