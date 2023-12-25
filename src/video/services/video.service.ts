import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../auth/interfaces/user.interface';
import { Video } from '../interfaces/video.interface';
import { VideoCreateDto } from '../dto/video.create.dto';
import { JwtService } from '@nestjs/jwt';
import { VideoSearchDto } from '../dto/video-search.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Video') private videoModel: Model<Video>,
    private jwtService: JwtService,
  ) {}

  async getAll(page: number, limit: number): Promise<Video[]> {
    return this.videoModel
      .find()
      .sort({ date: 'asc' })
      .skip(page * limit)
      .limit(limit);
  }

  async getById(id: string) {
    const { title, category, date, artist } = await this.videoModel
      .findById(id)
      .exec();

    return {
      id,
      title,
      category,
      date,
      artist,
    };
  }

  async create(
    jwt: string,
    videoCreateDTO: VideoCreateDto,
  ): Promise<VideoCreateDto> {
    const decodedJwtAccessToken = this.jwtService.decode(
      jwt?.split('Bearer ')[1],
    );

    const user = await this.userModel
      .findOne({ id: decodedJwtAccessToken?.sub })
      .exec();
    if (!user) throw new UnauthorizedException('User not found');

    const newVideo = new this.videoModel({
      title: videoCreateDTO.title,
      category: videoCreateDTO.category,
      date: new Date(),
      artist: user.username,
    });
    newVideo.save();

    return videoCreateDTO;
  }

  async search(videoSearchDTO: VideoSearchDto): Promise<Video[]> {
    const query = this.videoModel.find();

    if (videoSearchDTO.title) {
      query.find({ title: videoSearchDTO.title });
    }

    if (videoSearchDTO.artist) {
      query.find({ artist: videoSearchDTO.artist });
    }

    if (videoSearchDTO.category) {
      query.find({ category: videoSearchDTO.category });
    }

    if (videoSearchDTO.datelte) {
      query.find({ date: { $lte: new Date(videoSearchDTO.datelte) } });
    }

    if (videoSearchDTO.dategte) {
      query.find({ date: { $gte: new Date(videoSearchDTO.dategte) } });
    }

    query.skip(videoSearchDTO.limit * videoSearchDTO.page);

    query.limit(videoSearchDTO.limit);

    return await query.exec();
  }
}
