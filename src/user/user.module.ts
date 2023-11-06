import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UsersController } from './user.controller';

@Module({
  controllers: [UsersController],
  providers: [UserService, UserRepository],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
