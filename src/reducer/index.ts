

import { Context, IAction, State, Type } from "../utils/types";

export const defaultState: State = {
    app_token: localStorage.getItem('token_ib_mobile') as string || '',
    account: localStorage.getItem('account') || '{}',
    list_type: Number(sessionStorage.getItem('list_type')) || 1,
    filter_withdraw: '',
    filter_deposit: '',
    merchant_id:localStorage.getItem('merchant_id') || '',
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
        case Type.SET_TOKEN:
            localStorage.setItem('token_ib_mobile', payload.app_token as string);
            return { ...state, app_token: payload.app_token }
        case Type.SET_ACCOUNT:
            localStorage.setItem('account', payload.account as string);
            return { ...state, account: payload.account }
        case Type.SET_LIST_TYPE:
            sessionStorage.setItem('list_type', String(payload.list_type));
            return { ...state, list_type: payload.list_type }
        case Type.SET_WITHDRAW_FILTER:
            sessionStorage.setItem('filter_withdraw', payload.filter_withdraw as string);
            return { ...state, filter_withdraw: payload.filter_withdraw }
        case Type.SET_DEPOSIT_FILTER:
            sessionStorage.setItem('filter_deposit', payload.filter_deposit as string);
            return { ...state, filter_deposit: payload.filter_deposit }
        case Type.SET_MERCHANT:
            localStorage.setItem('merchant_id',payload.merchant_id as string);
            return { ...state,merchant_id:payload.merchant_id }
        default:
            return state;
    }
};
