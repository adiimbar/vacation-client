import { VacationsDetails } from '../models/VacationsDetails';

export class AppState {
    public vacations: VacationsDetails[] = [];
    public isLoggedIn: boolean = false;
}