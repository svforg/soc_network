import {UsersACType} from "../actions/usersActions";
import {USERS_TYPES} from "../constats/usersConstats";

export type UsersPhotosType = {
    small: string
    large: string
}
export type UsersType = {
    id: number
    followed: boolean
    name: string
    status: string
    photos: UsersPhotosType
}
export type UsersState = {
    users: Array<UsersType>
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching: boolean
    followEvent: any[]
}

let initialState = {
    users: [],
    pageSize: 8,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followEvent: [],
};

export const usersReducer = (state: UsersState = initialState, action: UsersACType): UsersState => {

    switch (action.type) {

        case USERS_TYPES.FOLLOW_USER: {
            let stateCopy = {...state, users: state.users};

            let newUsers = stateCopy.users.map(user =>
                (user.id === action.payload.userId) ? {...user, followed: true} : user);

            return {...stateCopy, users: newUsers};
        }

        case USERS_TYPES.UN_FOLLOW_USER: {
            let stateCopy = {...state, users: state.users};

            let newUsers = stateCopy.users.map(user =>
                (user.id === action.payload.userId) ? {...user, followed: false} : user);

            return {...stateCopy, users: newUsers};
        }

        case USERS_TYPES.SHOW_NEXT_USERS:
            return Array.isArray(action.payload.users) && action.payload.users.length
                ? {...state, users: [...action.payload.users]}
                : state;

        case USERS_TYPES.SHOW_MORE_USERS:
            return Array.isArray(action.payload.users) && action.payload.users.length
                ? {...state, users: [...state.users, ...action.payload.users]}
                : state;

        case USERS_TYPES.SET_CURRENT_PAGE:
            return action.payload.page
                ? {...state, currentPage: action.payload.page}
                : state;

        case USERS_TYPES.SET_TOTAL_COUNT:
            return action.payload.totalCount
                ? {...state, totalCount: action.payload.totalCount}
                : state;

        case USERS_TYPES.TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.payload.isFetching};

        case USERS_TYPES.TOGGLE_FOLLOW_EVENT:
            return {
                ...state,
                followEvent: action.payload.isFetching
                    ? [...state.followEvent, action.payload.userId]
                    : state.followEvent.filter(id => id !== action.payload.userId)
            };

        default:
            return state;
    }
};

