import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumber, IsString, Length, Validate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { AvailableArrayLength } from "src/utils/validators/array.validator";
import { ApiProperty } from "@nestjs/swagger";


class CreateOptionDto {
    @IsString({message: "must be a string"})
    @Length(1, 25, {message: "min/max length is 1/25"})
    name: string;
}

export class CreateContestDto {
    @ApiProperty({description: "name"})
    @IsString({message: "must be a string"})
    @Length(1, 25, {message: "min/max length is 1/25"})
    name: string;

    @ApiProperty({description: "description"})
    @IsString({message: "must be a string"})
    @Length(1, 250, {message: "min/max length is 1/250"})
    description: string;
    
    @ApiProperty({description: "array of number"})
    @IsArray()
    @ArrayMaxSize(2)
    @ArrayMinSize(1)
    @IsNumber({},{each: true})
    categoriesIds: Array<number>;

    @ApiProperty({ type: 'array', items: {type: 'object', properties: {name: {type: 'string'}}}, description: "objects of names" })
    @IsArray()
    @ValidateNested()
    @Type(() => CreateOptionDto)
    @Validate(AvailableArrayLength, [8, 16, 32, 64])
    options: Array<CreateOptionDto>;
}