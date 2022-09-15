
export interface State{
    test?:string,
    app_token?:string,
    list_type?:number
}

export enum Type{
    SET_TEST = 'set_test',
    SET_TOKEN = 'set_token',
    SET_LIST_TYPE = 'set_list_type'
};

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