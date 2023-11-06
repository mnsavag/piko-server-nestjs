import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
import { ConfigModule } from "@nestjs/config";
import { ContestModule } from './contest/contest.module';
import { CategoryModule } from './category/category.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { NestjsFormDataModule } from "nestjs-form-data";
import * as path from "path";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          entities: [],
          synchronize: false,
          autoLoadEntities: true
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, "..", 'src', 'assets'),
        }),
        UsersModule,
        ContestModule,
        CategoryModule,
        FilesModule,
        NestjsFormDataModule
    ],
})

export class AppModule {}