import { AppState } from "./app-state";
import { ActionType } from "./action-type";
import { Action } from "./action";

// need to break the reducer into components
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

            for (let tourObj of addFollowerVacationsArray) {
                if (tourObj.id === isFollowing) {
                    addFollowerVacationsArray[addFollowerArrayCount].isFollowed = isFollowing;

                    // probability should change it - it's supposed to update from socket
                    addFollowerVacationsArray[addFollowerArrayCount].followers = addFollowerVacationsArray[addFollowerArrayCount].followers + 1;
                    break;
                }
                addFollowerArrayCount = addFollowerArrayCount + 1;
              }
            break;

        case ActionType.RemoveUserFollow:
            let removeObj = action.payload;
            let tourIdToRemove: number = Number(removeObj.tourId);

            let removeFollowerVacationsArray = newAppState.vacations;
            let removeFollowerArrayCount: number = 0;

            for (let tourObj of removeFollowerVacationsArray) {
                if (tourObj.id === tourIdToRemove) {
                    removeFollowerVacationsArray[removeFollowerArrayCount].isFollowed = null;

                    // same - probability should change it - it's supposed to update from socket
                    removeFollowerVacationsArray[removeFollowerArrayCount].followers = removeFollowerVacationsArray[removeFollowerArrayCount].followers - 1;
                    break;
                }
                removeFollowerArrayCount = removeFollowerArrayCount + 1;
              }
            break;

        case ActionType.AddVacationToStore:
            let newVacation = action.payload;
            newVacation['isFollowed'] = null;

            newAppState.vacations.push(newVacation);
            break;

        case ActionType.DeleteVacation:
            let idOfVacationToDelete = Number(action.payload);
            let index = 0;

            for (let vacationObj of newAppState.vacations) {
                if(idOfVacationToDelete === vacationObj.id) {
                    newAppState.vacations.splice(index, 1);

                    break;
                }
                index = index + 1;
            }
            break;
    

        case ActionType.UpdateVacationInStore:
            let updatedVacation = action.payload;

            for (let vacationObj of newAppState.vacations) {
                if(updatedVacation.id === vacationObj.id) {

                    vacationObj.description = updatedVacation.description;
                    vacationObj.destination = updatedVacation.destination;
                    vacationObj.end_date = updatedVacation.end_date;
                    vacationObj.followers = updatedVacation.followers;
                    vacationObj.image_path = updatedVacation.image_path;
                    vacationObj.price = updatedVacation.price;
                    vacationObj.start_date = updatedVacation.start_date;

                    break;
                }

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