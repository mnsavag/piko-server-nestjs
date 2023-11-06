import { 
    Entity, 
    Column, 
    CreateDateColumn, 
    PrimaryGeneratedColumn, 
    OneToMany, 
    ManyToMany 
} from "typeorm";
import { Contest } from "../contest/contest.model";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";


@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({length: 25})
    username: string;

    @ApiProperty({example: "mail@gmail.com", description: "Email"})
    @Column({nullable: true, unique: true})
    mail: string;

    @Exclude()
    @Column({nullable: true})
    password: string;

    @ApiProperty({example: "2023-10-20T21:58:14.303Z", description: "Date"})
    @CreateDateColumn()
    createdDate: Date;

    @OneToMany(() => Contest, (contest) => contest.user)
    contests: Contest[];

    @ManyToMany(() => Contest, (contest) => contest.usersLiked)
    contestsLiked: Contest[];
    @ManyToMany(() => Contest, (contest) => contest.usersPassed)
    contestsPassed: Contest[];


    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}