import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './category.model';


@Injectable()
export class CategoryService {
    
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async getAll(): Promise<Category[]> | null {
        const categories = await this.categoryRepository.getCategories();
        return categories;
    }
}
