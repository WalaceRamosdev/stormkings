import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  // 1. PLAYERS / USERS API
  @Get('users')
  async getUsers(@Query('role') role?: string) {
    return this.prisma.user.findMany({
      where: role && role !== 'ALL' ? { role: role as any } : {},
      include: { stats: true },
      orderBy: { stats: { trophies: 'desc' } }
    });
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { stats: true, teams: { include: { team: true } } }
    });
  }

  @Patch('users/:id/verify')
  async toggleVerify(@Param('id') id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return this.prisma.user.update({
      where: { id },
      data: { role: user.role === 'ADMIN' ? 'USER' : 'ADMIN' } // toggle mock
    });
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  // 2. TEAMS API
  @Get('teams')
  async getTeams() {
    return this.prisma.team.findMany({
      include: { members: { include: { user: true } } },
      orderBy: { wins: 'desc' }
    });
  }

  @Get('teams/:id')
  async getTeam(@Param('id') id: string) {
    return this.prisma.team.findUnique({
      where: { id },
      include: { members: { include: { user: true } } }
    });
  }

  @Post('teams')
  async createTeam(@Body() body: { name: string; logo?: string; description?: string }) {
    return this.prisma.team.create({
      data: {
        name: body.name,
        logo: body.logo,
        description: body.description,
      }
    });
  }

  // 3. TOURNAMENTS & MATCHES API
  @Get('tournaments')
  async getTournaments() {
    return this.prisma.tournament.findMany({
      include: { groups: { include: { entries: { include: { team: true } } } }, matches: true }
    });
  }

  @Get('tournaments/:id')
  async getTournament(@Param('id') id: string) {
    return this.prisma.tournament.findUnique({
      where: { id },
      include: { groups: { include: { entries: { include: { team: true } } } }, matches: true }
    });
  }

  @Post('tournaments')
  async createTournament(@Body() body: { name: string; banner?: string; prize?: string; format: string; startDate: string }) {
    return this.prisma.tournament.create({
      data: {
        name: body.name,
        banner: body.banner,
        prize: body.prize,
        format: body.format,
        startDate: new Date(body.startDate),
      }
    });
  }

  @Put('matches/:id/score')
  async updateMatchScore(@Param('id') id: string, @Body() body: { scoreA: number; scoreB: number }) {
    const match = await this.prisma.match.findUnique({ where: { id } });
    if (!match) return { error: 'Match not found' };

    const status = 'COMPLETED';
    const winnerId = body.scoreA > body.scoreB ? match.teamAId : match.teamBId;

    // Update match
    const updatedMatch = await this.prisma.match.update({
      where: { id },
      data: {
        scoreA: body.scoreA,
        scoreB: body.scoreB,
        status: status as any,
        winnerId
      }
    });

    // If part of group, update group entry scores
    if (match.groupId) {
      const winnerIdStr = winnerId;
      const loserIdStr = winnerId === match.teamAId ? match.teamBId : match.teamAId;
      const roundDiff = Math.abs(body.scoreA - body.scoreB);

      // increment winner points
      await this.prisma.groupEntry.updateMany({
        where: { groupId: match.groupId, teamId: winnerIdStr },
        data: {
          played: { increment: 1 },
          won: { increment: 1 },
          points: { increment: 3 },
          roundDiff: { increment: roundDiff }
        }
      });

      // increment loser points
      await this.prisma.groupEntry.updateMany({
        where: { groupId: match.groupId, teamId: loserIdStr },
        data: {
          played: { increment: 1 },
          lost: { increment: 1 },
          roundDiff: { decrement: roundDiff }
        }
      });
    }

    return updatedMatch;
  }

  // 4. NEWS API
  @Get('news')
  async getNews() {
    return this.prisma.news.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  @Get('news/:id')
  async getArticle(@Param('id') id: string) {
    return this.prisma.news.findUnique({ where: { id } });
  }

  @Post('news')
  async createArticle(@Body() body: { title: string; content: string; imageUrl?: string; authorId: string }) {
    return this.prisma.news.create({
      data: {
        title: body.title,
        content: body.content,
        imageUrl: body.imageUrl,
        authorId: body.authorId,
        published: true,
      }
    });
  }
}
