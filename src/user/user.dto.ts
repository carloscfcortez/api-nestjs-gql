import { IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty() email: string;

  @IsNotEmpty() password: string;
}

export class UserRegisterDTO {
  @IsNotEmpty() email: string;

  @IsNotEmpty() password: string;

  @IsNotEmpty() name: string;

  @IsNotEmpty() lastname: string;
}

export class UserRO {
  id: string;
  email: string;
  name: string;
  lastname: string;
  image: string;
  created: Date;
  token?: string;
}
