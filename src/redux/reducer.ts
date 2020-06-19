import { AppState } from "./app-state";
import { ActionType } from "./action-type";
import { Action } from "./action";

// This function is NOT called direcrtly by you
export function reduce(oldAppState: AppState, action: Action): AppState {
    // Cloning the oldState (creating a copy)
    const newAppState = { ...oldAppState };

    switch (action.type) {
        case ActionType.Login:
            newAppState.isLoggedIn = true;
            break;

        case ActionType.GetAllVacations:
            newAppState.vacations = action.payload;
            break;

        case ActionType.GetUserFollowings:
            let userToursFollowings: {[k: string]: boolean} = {};
            action.payload.forEach((element: any) => {
                let key: string = element.tour_id.toString();
                userToursFollowings[key] = true;
            });
            newAppState.userToursFollowings = userToursFollowings;
            console.log(userToursFollowings)
            // newAppState.userToursFollowings = action.payload;
            break;

        case ActionType.getNumberOfFollowersForAllTours:
            newAppState.toursFollowers = action.payload;
            break;

        case ActionType.AddUserFollow:
            let addObj = action.payload;
            let isFollowing: any = addObj.tourId;
            let addFollowerVacationsArray = newAppState.vacations;
            let addFollowerArrayCount: number = 0;
            // console.log('in reducer');
            // console.log(isFollowing);
            // console.log(addFollowerVacationsArray);

            for (let tourObj of addFollowerVacationsArray) {
                // console.log(addFollowerArrayCount);
                // console.log(tourObj);
                if (tourObj.id === isFollowing) {
                    addFollowerVacationsArray[addFollowerArrayCount].isFollowed = isFollowing;
                    break;
                }
                addFollowerArrayCount = addFollowerArrayCount + 1;
              }

            break;

        case ActionType.RemoveUserFollow:
            let removeObj = action.payload;
            // console.log('in reducer remove follower');
            let tourIdToRemove: number = Number(removeObj.tourId);

            let removeFollowerVacationsArray = newAppState.vacations;
            let removeFollowerArrayCount: number = 0;
            // console.log('in reducer');
            // console.log(tourIdToRemove);
            // console.log(removeFollowerVacationsArray);

            for (let tourObj of removeFollowerVacationsArray) {
                // console.log(removeFollowerArrayCount);
                // console.log(tourObj);
                if (tourObj.id === tourIdToRemove) {
                    removeFollowerVacationsArray[removeFollowerArrayCount].isFollowed = null;
                    break;
                }
                removeFollowerArrayCount = removeFollowerArrayCount + 1;
              }

        break;

        case ActionType.SetUserType:
            newAppState.userType = action.payload;
            break;
            
    
    }

    // After returning the new state, it's being published to all subscribers
    // Each component will render itself based on the new state
    return newAppState;
}