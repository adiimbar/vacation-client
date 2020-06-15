import { VacationsDetails } from '../models/VacationsDetails';
import { FollowDetails } from '../models/FollowDetails';
import { ToursFollowersDetails } from '../models/toursFollowersDetails';

export class AppState {
    public vacations: VacationsDetails[] = [];
    public isLoggedIn: boolean = false;
    public userToursFollowings: FollowDetails[] = [];
    public toursFollowers: ToursFollowersDetails[] = [];
}