import { Category } from "src/app/categories/models/category.model";

export class Coach {
    id: number;
    created: Date;
    lastUpdated: Date;

    name: string;
    nickname: string;
    description: string;
    achievments: string;
    categoryId: number;
    language: string;
    price: number;
    discount: number;
    isCoachCertified: boolean;
    posterImgUrl: string;
    availability: Date;

    category: Category;

    constructor() {
        this.language = 'English';
        this.price = 0;
        this.discount = 0;
        this.isCoachCertified = true;
    }
}