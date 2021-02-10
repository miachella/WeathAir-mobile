export class Alert{
    id?: number;
    imageUrl?: string;
    text: string; 
    township?: Township;

    constructor(params:any) {
        Object.assign(this, params);
    }
}

export class Township{
    id?: number; 
    inseeCode: string;
    name: string;
    population?: number;
}