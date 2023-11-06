import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    ManyToMany 
} from "typeorm";
import { Contest } from "../contest/contest.model";


@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 50})
    name: string

    @ManyToMany(() => Contest, (contest) => contest.categories)
    contests: Contest[]

    constructor(partial: Partial<Contest>) {
        Object.assign(this, partial);
    }
}

/*
    CATEGORY = (
        (1, "music"),
        (2, "cinema"),
        (3, "sport"),
        (4, "technology"),
        (5, "fashion"),
        (6, "nature"),
        (7, "games"),
        (8, "other"),
    )
 */