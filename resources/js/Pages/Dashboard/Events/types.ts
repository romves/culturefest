import { Category } from "@/types/common";

export interface IFormData extends Record<string, any> {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    max_participants: number | string;
    is_seated: number | string;
    image: File | undefined;

    categories?: Category[] | [] ;
}
