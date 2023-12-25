import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema } from 'src/auth/schemas';
import { VideoSchema } from './schemas';
import { VideoController } from './controllers';
import { VideoService } from './services';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Video', schema: VideoSchema },
    ]),
    JwtModule.register({
      secret: 'JWT_SECRET',
    }),
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
