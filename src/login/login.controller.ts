import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  logInUser(@Body() body) {
    return this.loginService.logIn(body);
  }
}
