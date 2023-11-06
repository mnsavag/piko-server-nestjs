import { DeleteResult, ObjectId, Repository } from "typeorm";


export class TypeORMRepository<T> extends Repository<T> {
    
    async saveEntity(entity: T) {
        await this.save(entity);
    }

    async getById(id: number): Promise<T> {
        return await this.createQueryBuilder().where({id: id}).getOne();
    }

    async deleteById(id: number) {
        return await this.delete(id);
    }

    async getAll(): Promise<Array<T>> {
        return await this.find();
    }
}
