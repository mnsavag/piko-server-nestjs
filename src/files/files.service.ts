import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ContestSaveDir } from './types/contestFiles.types';

import * as path from "path";
import * as uuid from "uuid";

import * as fs from "fs";


@Injectable()
export class FilesService {

    async createFile(pathToFileSystemDir: string, 
                     pathToServerDir: string,
                     buffer: Buffer, 
                     extension: string): Promise<string> {
        
        const systemPath = path.join(pathToFileSystemDir, pathToServerDir)
        try {
            if (!fs.existsSync(systemPath)) {
                fs.mkdirSync(systemPath, {recursive: true});
            }
            const fileName = uuid.v4() + '.' + extension;
            const fullSystemPath = path.join(systemPath, fileName);
            fs.writeFileSync(fullSystemPath, buffer);

            return path.join(pathToServerDir, fileName);
        } catch (e) {
            throw new HttpException("File writing error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getPathsToSaveContestImage(userId: number | null, contestId: number | null): Promise<ContestSaveDir> {
        const fileSystemPath = path.resolve(__dirname, "..", "..", "src", "assets");
        
        const contestDirName = contestId ? contestId.toString() : uuid.v4();
        const contestOwner = userId ? userId.toString() : "community";
        
        const pathToContestDir = path.join("contests", contestOwner, contestDirName);
        const pathToPreview = path.join(pathToContestDir, "preview");
        const pathToOptions = path.join(pathToContestDir, "options");
        return {
            rootSystemPath: fileSystemPath,
            contestDir: contestDirName, 
            previewDir: pathToPreview, 
            optionsDir: pathToOptions
        };
    }
}
