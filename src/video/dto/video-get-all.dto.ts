import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class VideoGetAllDto {
  @ApiProperty({
    description: 'Page number',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  page: number;

  @ApiProperty({
    description: 'Limit of records per page',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  limit: number;
}
