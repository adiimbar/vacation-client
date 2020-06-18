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
            let keyToAdd: string = addObj.tourId.toString();
            newAppState.userToursFollowings[keyToAdd] = true;
            // console.log('in reducer AddUserFollow')
            // console.log(newAppState.userToursFollowings);
            // console.log(userToursFollowings)

            // newAppState.userToursFollowings = action.payload;
            // newAppState.isFollowing = action.payload;
            break;

        case ActionType.RemoveUserFollow:
            // let removeObj = action.payload;
            // let keyToRemove: string = removeObj.tour_id.toString();
            // console.log(newAppState.userToursFollowings);
            // delete newAppState.userToursFollowings;

            // newAppState.userToursFollowings = action.payload;
            // newAppState.isFollowing = action.payload;
        break;

        case ActionType.SetUserType:
            newAppState.userType = action.payload;
            break;
            
    
    }

    // After returning the new state, it's being published to all subscribers
    // Each component will render itself based on the new state
    return newAppState;
}