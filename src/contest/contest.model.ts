import { 
    Entity, 
    Column, 
    CreateDateColumn, 
    PrimaryGeneratedColumn, 
    ManyToOne, 
    ManyToMany, 
    JoinTable 
} from "typeorm";
import { User } from "../user/user.model";
import { Category } from "../category/category.model";
import { CreateContestAttrs, OptionAttrs } from "./types/contest.types";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";


@Entity()
export class Contest {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({length: 25})
    name: string
    
    @ApiProperty()
    @Column({length: 250})
    description: string

    @ApiProperty({description: "file format"})
    @Column()
    previewFirst: string

    @ApiProperty({description: "file format"})
    @Column()
    previewSecond: string

    @ApiProperty({example: "[{id: 1, name: name, image: url, victoryCount: 1}]"})
    @Column({type: 'jsonb'})
    options: Array<OptionAttrs>

    @ApiProperty({description: "array of options length"})
    @Column()
    amountOptions: number;
    
    @ApiProperty({description: "amount of contest passes"})
    @Column({default: 0})
    countPassed: number;

    @ApiProperty()
    @CreateDateColumn({type: 'timestamptz'})
    createdDate: Date;

    @ApiProperty({description: "true if all options are filled with pictures"})
    @Column({default: false})
    canBePublished: boolean;

    @ManyToOne(() => User, (user) => user.contests)
    user: User;

    @ManyToMany(() => Category, (category) => category.contests)
    @JoinTable()
    categories: Category[];

    @ManyToMany(() => User, (user) => user.contestsLiked)
    @JoinTable()
    usersLiked: User[];
    @ManyToMany(() => User, (user) => user.contestsPassed)
    @JoinTable()
    usersPassed: User[];

    
    constructor(attrs: CreateContestAttrs) {
        if (!attrs) {
            return;
        }
        this.amountOptions = attrs.options.length;
        this.options = []
        for (let i = 0; i < attrs.options.length; i++) {
            this.options.push({
                id: i + 1, 
                ...attrs.options[i],
                image: "",
                victoryCount: 0
            });
        }
        
        delete attrs.options;
        Object.assign(this, attrs);
    }
}
