import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { GlobalPrismaExtension } from './prisma.extension';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  extension = this.$extends(GlobalPrismaExtension);

  async onModuleInit() {
    await this.$connect();
  }

  clearDefaultExtensions(): void {
    this.extension = this.$extends({});
  }
}
