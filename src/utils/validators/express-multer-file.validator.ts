import { HttpException, HttpStatus } from "@nestjs/common";

export function isAccessMimeType(files: Express.Multer.File[]): boolean {
    const accessMimeTypes = ['image/png', 'image/jpeg', 'image/png'];
    const fileType = files.find((file) => accessMimeTypes.includes(file.mimetype));
    if (fileType) {
        return true
    }
    throw new HttpException(`Access mimetype ${accessMimeTypes.join(' ')}`, HttpStatus.UNPROCESSABLE_ENTITY);;
}