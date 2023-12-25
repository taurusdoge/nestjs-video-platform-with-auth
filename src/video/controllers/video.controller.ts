import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  UseGuards,
  Query,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { VideoService } from 'src/video/services';
import { VideoCreateDto, VideoGetAllDto, VideoSearchDto } from '../dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @ApiBearerAuth('AccessKey')
  @ApiOperation({ description: 'Get all videos' })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Get()
  async getAll(@Query() { page, limit }: VideoGetAllDto) {
    try {
      const videos = await this.videoService.getAll(page, limit);

      return {
        records: videos,
        page,
        limit,
      };
    } catch (ex) {
      throw new InternalServerErrorException(
        ex.message,
        'Internal server error',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @ApiBearerAuth('AccessKey')
  @ApiOperation({ description: 'Create a video' })
  @ApiResponse({
    status: 201,
    description: 'The video has been created.',
    type: VideoCreateDto,
  })
  @Post()
  async create(
    @Headers() { authorization },
    @Body() videoCreateDTO: VideoCreateDto,
  ) {
    try {
      return await this.videoService.create(authorization, videoCreateDTO);
    } catch (ex) {
      throw new InternalServerErrorException(
        ex.message,
        'Internal server error',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @ApiBearerAuth('AccessKey')
  @ApiOperation({ description: 'Get video by id' })
  @ApiResponse({
    status: 201,
    description: 'Found a video by id',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.videoService.getById(id);
    } catch (ex) {
      throw new InternalServerErrorException(
        ex.message,
        'Internal server error.',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @ApiBearerAuth('AccessKey')
  @ApiOperation({ description: 'Search all the videos satisfying criteria' })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Get('search')
  async search(@Query() query: VideoSearchDto) {
    try {
      const videos = await this.videoService.search(query);

      return {
        items: videos,
        page: query.page,
        limit: query.limit,
      };
    } catch (ex) {
      throw new InternalServerErrorException(
        ex.message,
        'Internal server error.',
      );
    }
  }
}
