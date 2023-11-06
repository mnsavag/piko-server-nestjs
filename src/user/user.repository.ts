import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from './user.model';
import { TypeORMRepository } from 'src/base.repository';


@Injectable()
export class UserRepository extends TypeORMRepository<User> {

    constructor(private readonly entityManager: EntityManager) {
        super(User, entityManager);
    }

    async getByMail(mail: string): Promise<User> {
        return await this.entityManager.findOneBy(User, {mail: mail});
    }
}
