export type Word = {
    wordName: string;
    translation: string;
    sound: string;
    image: string;
}

export interface Category {
    id: number;
    name: string;
    words: Word[];
}