import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { CategoryPrismaGateway } from './gateways/category-prisma-gateway';

@Module({
  providers: [
    CategoriesResolver,
    CategoriesService,
    CategoryPrismaGateway,
    {
      provide: 'CategoryPersistanceGateway',
      useExisting: CategoryPrismaGateway,
    },
  ],
})
export class CategoriesModule {}
