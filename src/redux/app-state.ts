import { VacationsDetails } from '../models/VacationsDetails';
import { FollowDetails } from '../models/FollowDetails';
import { ToursFollowersDetails } from '../models/toursFollowersDetails';
// import { UserFollowingDetails } from '../models/UserFollowingDetails';

export class AppState {
    public vacations: VacationsDetails[] = [];
    public isLoggedIn: boolean = false;
    public userToursFollowings: any = {};
    public isFollowing: FollowDetails[] = [];
    public toursFollowers: ToursFollowersDetails[] = [];
}