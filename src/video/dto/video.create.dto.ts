import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VideoCreateDto {
  @ApiProperty({
    description: 'Video title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Video category',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
