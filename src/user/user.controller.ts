import { 
    Controller,
    Body, Param, 
    Get, Post, 
    UsePipes, ValidationPipe, 
    UseInterceptors, ClassSerializerInterceptor 
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './user.model';


@Controller('api/user')
export class UsersController {

    constructor(private userService: UserService) {}

    @ApiResponse({status: 201, type: User})
    @ApiOperation({summary: 'Create a user'})

    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
    @Post()
    create(@Body() createDto: CreateUserDto) {
        return this.userService.createUser(createDto);
    }


    @ApiResponse({status: 200, type: User})
    @ApiOperation({summary: 'Get user by id'})

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    get(@Param('id') id: number) {
        return this.userService.getUser(id);
    }
}
