export class SuccessfulLoginServerResponse{
    public constructor(
        // public token?:number,       
        public token?:string,
        public userId?:string,
        public userType?:string
    ){}

}