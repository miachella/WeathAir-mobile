export class Alert{
    id?: number;
    imageUrl?: string;
    text: string; 
    township?: string;

    constructor(params:any) {
        Object.assign(this, params);
    }
}