import { User } from "../data/models";

export const getUserRanking = (user: User, sortedUsers: User[]) => {

    let ranking = 1;
    for(let i=0; i<sortedUsers.length; i++) {
        if(sortedUsers[i].id === user.id ) {
            ranking = i + 1;
            break;
        }
    }

    return ranking
}