import { Category } from "src/category/category.model";


export type CreateOptionAttrs = {
    name: string;
}

export type OptionAttrs = {
    id: number;
    name: string;
    image: string;
    victoryCount: number;
}

export type GetOptionAttrs = {
    id: number;
    name: string;
    image: string;
    victoryCount: number;
    winRate: number;
}

export type CreateContestAttrs = {
    name: string;
    description: string;
    previewFirst: string;
    previewSecond: string;
    categories: Category[];
    options: Array<CreateOptionAttrs>;
}
