import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, Profile } from 'passport-discord';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private prisma: PrismaService) {
    super({
      clientID: process.env.DISCORD_CLIENT_ID || 'mock_client_id',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || 'mock_client_secret',
      callbackURL: process.env.DISCORD_CALLBACK_URL || 'http://localhost:3001/auth/discord/callback',
      scope: ['identify', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const { id, username, avatar } = profile;
    
    // Check if user exists, if not create them
    let user = await this.prisma.user.findUnique({
      where: { discordId: id },
    });

    const avatarUrl = avatar
      ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
      : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80';

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          discordId: id,
          username: username,
          nickname: username, // default nickname to username
          avatar: avatarUrl,
          role: 'USER',
          stats: {
            create: {
              kdRatio: 0.0,
              winRate: 0.0,
              matchesPlayed: 0,
              mvpCount: 0,
              trophies: 0,
            }
          }
        },
      });
    } else {
      // update avatar or username if changed
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          username,
          avatar: avatarUrl,
        }
      });
    }

    return user;
  }
}
