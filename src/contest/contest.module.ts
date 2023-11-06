import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContestService } from './contest.service';
import { ContestController } from './contest.controller';
import { Contest } from './contest.model';
import { ContestRepository } from './contest.repository';
import { CategoryService } from 'src/category/category.service';
import { CategoryRepository } from 'src/category/category.repository';
import { FilesModule } from 'src/files/files.module';
import { NestjsFormDataModule } from 'nestjs-form-data';


@Module({
    controllers: [ContestController],
    providers: [ContestService, ContestRepository, CategoryService, CategoryRepository],
    imports: [TypeOrmModule.forFeature([Contest]), FilesModule, NestjsFormDataModule],
})
export class ContestModule {}
