import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { AccountEntity } from './account.entity';
import { AccountRO, AccountDTO } from './account.dto';

@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(AccountEntity) private accountRepository: Repository<AccountEntity>,
		@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
	) {}

	private accountToResponseObject(account: AccountEntity): AccountRO {
		const responseObject: any = {
			...account
		};

		return responseObject;
	}

	private ensureOwnership(account: AccountEntity, userId: string) {
		if (account.user.id !== userId) {
			throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
		}
	}

	async showAll(page: number = 1, newest?: boolean, userId?: number): Promise<AccountRO[]> {
		const account = await this.accountRepository.find({
			relations: [ 'instituition' ],
			where: { user: userId },
			take: 25,
			skip: 25 * (page - 1),
			order: newest && { createdAt: 'DESC' }
		});
		return account.map((account) => this.accountToResponseObject(account));
	}

	async read(id: string): Promise<AccountRO> {
		const account = await this.accountRepository.findOne({
			where: { id },
			relations: [ 'user' ]
		});

		if (!account) {
			throw new HttpException('Not found', HttpStatus.NOT_FOUND);
		}

		return this.accountToResponseObject(account);
	}

	async create(userId: string, data: AccountDTO): Promise<AccountRO> {
		const user = await this.userRepository.findOne({ where: { id: userId } });
		const account = await this.accountRepository.create({ ...data, user: user });
		await this.accountRepository.save(account);
		return this.accountToResponseObject(account);
	}

	async update(id: string, userId: string, data: Partial<AccountDTO>): Promise<AccountRO> {
		let account = await this.accountRepository.findOne({
			where: { id },
			relations: [ 'user' ]
		});
		if (!account) {
			throw new HttpException('Not found', HttpStatus.NOT_FOUND);
		}
		this.ensureOwnership(account, userId);
		await this.accountRepository.update({ id }, data);
		account = await this.accountRepository.findOne({
			where: { id },
			relations: [ 'user' ]
		});
		return this.accountToResponseObject(account);
	}

	async destroy(id: string, userId: string): Promise<AccountRO> {
		const account = await this.accountRepository.findOne({
			where: { id },
			relations: [ 'user' ]
		});
		if (!account) {
			throw new HttpException('Not found', HttpStatus.NOT_FOUND);
		}
		this.ensureOwnership(account, userId);
		await this.accountRepository.remove(account);
		return this.accountToResponseObject(account);
	}
}
