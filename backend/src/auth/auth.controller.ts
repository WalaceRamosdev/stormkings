import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  async discordLogin() {
    // Redirects to Discord
  }

  @Get('discord/callback')
  @UseGuards(AuthGuard('discord'))
  async discordCallback(@Req() req: any, @Res() res: Response) {
    const session = this.authService.generateJwt(req.user);
    
    // Redirect back to frontend dashboard with token and user details in query parameters
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectUrl = `${frontendUrl}/?token=${session.access_token}&user=${encodeURIComponent(JSON.stringify(session.user))}`;
    
    return res.redirect(redirectUrl);
  }
}
