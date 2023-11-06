import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class GetContestsQueryDto {
    //@ApiProperty({description: "name"})
    limit: number | null;

    //@ApiProperty({description: "name"})
    offset: number | null;

    @ApiProperty({description: "get all contest by input name"})
    @IsString()
    nameFilter: string | null;
}