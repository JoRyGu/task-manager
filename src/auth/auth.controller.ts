import { Controller, Post, Inject, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('signup')
  signUp(@Body(ValidationPipe) authCredentials: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentials);
  }
}