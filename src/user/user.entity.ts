import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { UserRO } from './user.dto';
import { AccountEntity } from '../account/account.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment') id: string;

  @CreateDateColumn() created: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
  })
  lastname: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  image: string;

  @Column('text') password: string;

  @OneToMany(type => AccountEntity, account => account.user, { cascade: true })
  accounts: AccountEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const { id, created, token, name, lastname, image, email } = this;
    const responseObject: UserRO = {
      id,
      created,
      email,
      name,
      lastname,
      image,
    };

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  private get token(): string {
    // const config: any = new EnvService().read();
    const { id, email } = this;

    return jwt.sign(
      {
        id,
        email,
      },
      'a1a1a1a1a1a1',
      { expiresIn: '7d' },
    );
  }
}
