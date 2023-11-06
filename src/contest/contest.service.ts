import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Contest } from './contest.model';
import { ContestRepository } from './contest.repository';

import { FilesService } from 'src/files/files.service';
import { CategoryService } from 'src/category/category.service';

import { CreateContestDto } from './dto/create-contest.dto';
import { CreateOptionAttrs, GetOptionAttrs, OptionAttrs } from './types/contest.types';
import { ContestSaveDir } from 'src/files/types/contestFiles.types';


@Injectable()
export class ContestService {

    constructor(
        private readonly contestRepository: ContestRepository,
        private readonly categoryService: CategoryService,
        private readonly filesService: FilesService
    ) {}

    async createContest(createDto: CreateContestDto): Promise<Contest> {
        const dtoCatIds = createDto.categoriesIds;
        
        let categories = await this.categoryService.getAll();
        categories = categories.filter((category) => dtoCatIds.includes(category.id));
        if (categories.length != dtoCatIds.length) {
            throw new HttpException(`Some categories doesn't exist`, HttpStatus.NOT_FOUND);
        }

        const contest = new Contest({
            name: createDto.name,
            description: createDto.description,
            previewFirst: "",
            previewSecond: "",
            categories: categories,
            options: createDto.options
        });
        await this.contestRepository.saveEntity(contest);
        return contest;
    }

    async uploadImages(idContest: number,
                     previewFirst: Express.Multer.File,
                     previewSecond: Express.Multer.File,
                     optionsFiles: Express.Multer.File[]): Promise<Contest>  {
        const contest = await this.getContest(idContest);
        if (!contest) {
            throw new HttpException(`Contest with id ${idContest} not found`, HttpStatus.NOT_FOUND);
        }
        if (contest.canBePublished) {
            throw new HttpException("Contest already filled", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (contest.options.length != optionsFiles.length) {
            throw new HttpException("Contest and optionsFiles length are different", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const paths: ContestSaveDir = await this.filesService.getPathsToSaveContestImage(null, contest.id);
        contest.previewFirst = await this.filesService.createFile(
            paths.rootSystemPath,
            paths.previewDir,
            previewFirst.buffer,
            previewFirst.mimetype.split('/').at(-1)
        );
        contest.previewSecond = await this.filesService.createFile(
            paths.rootSystemPath,
            paths.previewDir,
            previewSecond.buffer,
            previewSecond.mimetype.split('/').at(-1)
        );
        for (let i = 0; i < optionsFiles.length; i++) {
            contest.options[i].image = await this.filesService.createFile(
                paths.rootSystemPath,
                paths.optionsDir,
                optionsFiles[i].buffer,
                optionsFiles[i].mimetype.split('/').at(-1)
            );
        }
        contest.canBePublished = true;
        await this.contestRepository.saveEntity(contest);
        return contest;
    }

    async getContest(id: number): Promise<Contest> | null {
        let contest = await this.contestRepository.getById(id);
        return contest;
    }

    async getAllAccessContests(nameFilter: string): Promise<Contest[]> | null {
        const contests = await this.contestRepository.getAllCanPublished();
        if (nameFilter) {
            return contests.filter((contest) => contest.name.toLowerCase().includes(nameFilter.toLowerCase()));
        }
        return contests;
    }

    async deleteContest(id: number) {
        await this.contestRepository.deleteById(id);
    }

    async updateOptionVictory(id: number, optionId: number): Promise<OptionAttrs[]> {
        let options = await this.contestRepository.getContestOptions(id);
        if (!options) {
            throw new HttpException(`Contest with id ${id} not found`, HttpStatus.NOT_FOUND);
        }
        const index = options.findIndex(e => e.id == optionId);
        if (index == -1) {
            throw new HttpException(`Option with id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        options[index].victoryCount += 1;
        await this.contestRepository.updateOptions(id, options);

        const totalPassed = options.reduce((accum, item) => accum + item.victoryCount, 0)
        await this.contestRepository.updateCntPassed(id, totalPassed);
        return options;
    }

    async getOptionsTopList(id: number): Promise<GetOptionAttrs[]> {
        const options = await this.contestRepository.getContestOptions(id);
        if (!options) {
            throw new HttpException(`Option with id ${id} not found`, HttpStatus.NOT_FOUND);
        }
        
        options.sort((a, b) => b.victoryCount - a.victoryCount);

        const totalGames = options.reduce((accum, item) => accum + item.victoryCount, 0);
        if (totalGames == 0) {
            return options.map((item) => {
                return {
                    ...item, 
                    winRate:0
                }
            });
        }
        return options.map((item) => {
            return {
                ...item, 
                winRate: +(item.victoryCount / totalGames * 100).toFixed(2)
            }
        });
    }
}