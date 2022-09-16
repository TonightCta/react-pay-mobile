
export interface State{
    test?:string,
    app_token?:string,
    list_type?:number,
    filter_withdraw?:string,
    filter_deposit?:string
}

export enum Type{
    SET_TEST = 'set_test',
    SET_TOKEN = 'set_token',
    SET_LIST_TYPE = 'set_list_type',
    SET_WITHDRAW_FILTER = 'set_withdraw_filter',
    SET_DEPOSIT_FILTER = 'set_deposit_filter'
};

export interface FilterW{
    merchant:string,
    order_id:string,
    address:string,
    start:string,
    end:string,
    min:number | string,
    max:number | string,
    hash:string,
    coin:string,
    status:string | number
}

export interface FilterD{
    merchant:string,
    coin:string,
    order_id:string,
    address:string,
    start:string,
    end:string,
    min:string | number,
    max:string | number,
    hash:string
}

export interface IAction{
    type:string,
    payload:State
}

export interface Context{
    state:State,
    dispatch:(action:IAction) => void
}

export interface Find{
    email:string,
    code:number | string,
    new_pass:string,
    repeat_pass:string
}

export interface Login{
    email:string,
    password:string,
    auth_code:number | string
}