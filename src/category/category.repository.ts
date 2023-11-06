import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { TypeORMRepository } from 'src/base.repository';
import { Category } from './category.model';


@Injectable()
export class CategoryRepository extends TypeORMRepository<Category> {

    constructor(private readonly entityManager: EntityManager) {
        super(Category, entityManager);
    }

    async getCategories() {
        return await this.find();
    }
}
