import { HttpException, HttpStatus, Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { instanceToPlain } from 'class-transformer';


@Injectable()
export class UserService {
    
    constructor(private readonly userRepository: UserRepository) {}
    
    async createUser(createDto: CreateUserDto): Promise<User> {        
        const userByMail = await this.userRepository.getByMail(createDto.mail);
        if (userByMail) {
            throw new HttpException(`a user with ${createDto.mail} mail already exists`, HttpStatus.CONFLICT);
        }
        
        const user = new User(createDto);
        await this.userRepository.saveEntity(user);
        return user;
    }

    async getUser(id: number): Promise<User> | null {
        const user = await this.userRepository.getById(id);
        return user;
    }
}
