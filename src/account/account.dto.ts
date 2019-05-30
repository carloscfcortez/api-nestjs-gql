import { IsString, IsCurrency, IsBoolean } from 'class-validator';

export class AccountDTO {
  @IsString() readonly name: string;

  @IsString() readonly description: string;

  @IsCurrency() readonly initialAmount: number;

  @IsString() readonly accountType: string;

  @IsBoolean() readonly archived: boolean;
}

export class AccountRO {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  accountType: string;
  archived: boolean;
}
