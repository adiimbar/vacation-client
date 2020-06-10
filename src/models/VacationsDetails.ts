export class VacationsDetails{
    public constructor(
        public destination?:string,
        public description?:string,
        public image_path?:string,
        public start_date?:Date,
        public end_date?:Date,
        public price?:number,
    ){}

}