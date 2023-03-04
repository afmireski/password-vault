import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import GlobalPrismaExtension from './prisma.extension';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  extension = this.$extends(GlobalPrismaExtension);

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  mergeExtensions(extensions: any[]): void {
    console.log(this.extension);

    this.extension = Object.assign(this.extension, ...extensions);

    console.log(this.extension);
  }

  clearDefaultExtensions(): void {
    console.log(this.extension);
    this.extension = this.$extends({});
    console.log(this.extension);
  }
}
