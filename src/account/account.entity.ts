import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn('increment') id: string;

  @CreateDateColumn() createdAt: Date;

  @CreateDateColumn() updatedAt: Date;

  @Column('text') name: string;

  @Column('text') description: string;

  @Column('float', { default: 0 })
  initialAmount: number;

  @Column('uuid', { nullable: true })
  uuid: string;

  @Column({
    type: 'enum',
    enum: ['checking_account'],
  })
  accountType: string;

  @Column('boolean', { default: false })
  archived: boolean;

  @ManyToOne(type => UserEntity, user => user.accounts)
  user: UserEntity;
}
