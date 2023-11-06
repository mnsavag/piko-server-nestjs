import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';

@Module({
    providers: [CategoryService, CategoryRepository],
    imports: [TypeOrmModule.forFeature([Category])],
})
export class CategoryModule {}
