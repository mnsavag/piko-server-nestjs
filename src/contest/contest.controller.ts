import { 
    Controller,
    Body, Param, 
    Get, Post, Delete, Patch,
    UsePipes, ValidationPipe, 
    UseInterceptors, ClassSerializerInterceptor, 
    UploadedFiles, Query
} from '@nestjs/common';

import { ContestService } from './contest.service';
import { CreateContestDto } from './dto/create-contest.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Contest } from './contest.model';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { isAccessMimeType } from 'src/utils/validators/express-multer-file.validator';
import { GetContestsQueryDto } from './dto/query-contest.dto';


@Controller('api/contest')
export class ContestController {
    constructor(private contestService: ContestService) {}

    @ApiResponse({status: 201, type: Contest})
    @ApiOperation({summary: 'Create a contest'})
    @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
    @Post()
    create(@Body() dto: CreateContestDto) {
        return this.contestService.createContest(dto);
    }

    @ApiResponse({type: Contest})
    @ApiOperation({summary: 'Loads images if the contest is not filled with them'})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            previewFirst: {
              type: 'string',
              format: 'binary',
            },
            previewSecond: {
              type: 'string',
              format: 'binary',
            },
            optionsFiles: {
              type: 'array',
              items: {
                type: 'string',
                format: 'binary',
              }
            },
          },
        },
      })
    @UseInterceptors(FileFieldsInterceptor([
      { name: 'previewFirst', maxCount: 1 },
      { name: 'previewSecond', maxCount: 1 },
      { name: 'optionsFiles'},
    ]))
    @Patch(':id/upload')
    uploadContestImages(@Param('id') id: number,
                      @UploadedFiles()
                            files: { 
                                previewFirst: Express.Multer.File[], 
                                previewSecond: Express.Multer.File[], 
                                optionsFiles: Express.Multer.File[]
                            }) {
        isAccessMimeType(files.previewFirst); 
        isAccessMimeType(files.previewSecond); 
        isAccessMimeType(files.optionsFiles);

        return this.contestService.uploadImages(
            id,
            files.previewFirst[0], 
            files.previewSecond[0], 
            files.optionsFiles
        );
    }


    @ApiResponse({type: Contest})
    @ApiOperation({summary: 'Get contest by id'})
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    get(@Param('id') id: number) {
        return this.contestService.getContest(id);
    }


    @ApiResponse({type: Contest, isArray: true})
    @ApiOperation({summary: 'Get all contests'})
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getAllAccessContests(@Query() query: GetContestsQueryDto) {
        return this.contestService.getAllAccessContests(query.nameFilter);
    }


    @ApiOperation({summary: 'Delete contest'})
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.contestService.deleteContest(id);
    }


    @ApiOperation({summary: 'Update victory of contest option'})
    @ApiResponse({isArray: true})
    @Patch(':id/option/:option/victory')
    updateOptionVictory(@Param('id') id: number, @Param('option') optionId: number) {
        return this.contestService.updateOptionVictory(id, optionId);
    }


    @ApiOperation({summary: 'Get a list of options sorted in descending order'})
    @ApiResponse({isArray: true})
    @Get(':id/top-list')
    getOptionsTopList(@Param('id') id: number) {
        return this.contestService.getOptionsTopList(id);
    }
}