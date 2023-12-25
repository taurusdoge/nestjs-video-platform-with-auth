import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class VideoSearchDto {
  @ApiProperty({
    description: 'Titles to search',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'From specified artist',
    required: false,
  })
  @IsOptional()
  @IsString()
  artist?: string;

  @ApiProperty({
    description: 'From specified category',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: 'Page number',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  page: number;

  @ApiProperty({
    description: 'Limit of records per page',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  limit: number;

  @ApiProperty({
    description: 'Date less than specified',
    required: false,
  })
  @IsOptional()
  @IsString()
  datelte?: string;

  @ApiProperty({
    description: 'Date greater than specified',
    required: false,
  })
  @IsOptional()
  @IsString()
  dategte?: string;
}
