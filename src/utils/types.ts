
export interface State{
    test?:string,
    app_token?:string,
}

export enum Type{
    SET_TEST = 'set_test',
    SET_TOKEN = 'set_token'
};

export interface IAction{
    type:string,
    payload:State
}

export interface Context{
    state:State,
    dispatch:(action:IAction) => void
}