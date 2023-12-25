import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../services';
import { AuthCredentialsDto, AuthLoginDto } from '../dto';
import { LocalAuthGuard } from '../guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @ApiOperation({ description: 'Register a user' })
  @ApiResponse({
    status: 201,
    description: 'User data',
  })
  @ApiResponse({
    status: 400,
    description: 'Registration failed',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post('signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @ApiOperation({ description: 'Authenticate a user' })
  @ApiResponse({
    status: 201,
    description: 'User data',
  })
  @ApiResponse({
    status: 400,
    description: 'Authentication failed',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post('signin')
  async signIn(
    @Request() req,
    @Body(ValidationPipe) authLoginDto: AuthLoginDto,
  ) {
    // TODO: use authLoginDto
    return this.authService.signIn(req.user);
  }
}
