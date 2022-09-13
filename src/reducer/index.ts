

import { Context, IAction, State,Type } from "../utils/types";

export const defaultState : State = {
    test:localStorage.getItem('test') as string || '',
    app_token:localStorage.getItem('token_ib_mobile') as string || '',
};

export const defaultContext : Context = {
    state:defaultState,
    dispatch:(_:IAction) => {}
}

export const defaultStateInit = (defaultState:State) => {
    return defaultState
}

export const initState = (state:State,action:IAction) => {
    const { type,payload } = action;
    switch(type){
        case Type.SET_TEST:
            localStorage.setItem('test',payload.test as string);
            return { ...state,test:payload.test };
        case Type.SET_TOKEN:
            localStorage.setItem('token_ib_mobile',payload.app_token as string);
            return { ...state,app_token:payload.app_token }
        default:
            return state;
    }
};
