

import { Context, IAction, State, Type } from "../utils/types";

export const defaultState: State = {
    test: localStorage.getItem('test') as string || '',
    app_token: localStorage.getItem('token_ib_mobile') as string || '',
    list_type: Number(sessionStorage.getItem('list_type')) || 1,
};

export const defaultContext: Context = {
    state: defaultState,
    dispatch: (_: IAction) => { }
}

export const defaultStateInit = (defaultState: State) => {
    return defaultState
}

export const initState = (state: State, action: IAction) => {
    const { type, payload } = action;
    switch (type) {
        case Type.SET_TEST:
            localStorage.setItem('test', payload.test as string);
            return { ...state, test: payload.test };
        case Type.SET_TOKEN:
            localStorage.setItem('token_ib_mobile', payload.app_token as string);
            return { ...state, app_token: payload.app_token }
        case Type.SET_LIST_TYPE:
            sessionStorage.setItem('list_type', String(payload.list_type));
            return { ...state, list_type: payload.list_type }

        default:
            return state;
    }
};
