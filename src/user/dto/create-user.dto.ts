import { IsEmail, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
// don't use mapper type because of swagger 


export class CreateUserDto {
    @ApiProperty({example: "name", description: 'username'})
    @IsString({message: "must be a string"})
    @Length(1, 25, {message: "min/max length is 1/25"})
    username: string;

    @ApiProperty({example: "mail@gmail.com", description: 'email'})
    @IsString({message: "must be a string"})
    @IsEmail({}, {message: "incorrect email"})
    mail: string;

    @ApiProperty({example: "12345", description: 'password'})
    @IsString({message: "must be a string"})
    password: string;
}
