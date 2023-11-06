import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { TypeORMRepository } from 'src/base.repository';
import { Contest } from './contest.model';
import { OptionAttrs } from './types/contest.types';


@Injectable()
export class ContestRepository extends TypeORMRepository<Contest> {

    constructor(private readonly entityManager: EntityManager) {
        super(Contest, entityManager);
    }

    async getContestOptions(id: number): Promise<OptionAttrs[]> | null {
        const contest = await this.createQueryBuilder().where({id: id}).getOne();
        if (!contest) {
            return null;
        }
        return contest.options;
    }

    async updateOptions(id: number, option: Array<OptionAttrs>) {
        await this.update(id, { options: option });
    }

    async updateCntPassed(id: number, totalPassed: number) {
        await this.update(id, { countPassed: totalPassed});
    }

    async getAllCanPublished(): Promise<Contest[]> | null {
        return await this.find({where: { canBePublished: true }});
    }
}
