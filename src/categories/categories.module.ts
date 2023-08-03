import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { CategoryPrismaAdapter } from './adapters/category-prisma.adapter';

@Module({
  providers: [
    CategoriesResolver,
    CategoriesService,
    CategoryPrismaAdapter,
    {
      provide: 'CategoryPersistanceGateway',
      useExisting: CategoryPrismaAdapter,
    },
  ],
})
export class CategoriesModule {}
