import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty({
    description: "User's name",
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: "User's email",
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "User's password",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
