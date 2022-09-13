import { ReactElement, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IBPayMobile } from "../../route/router";
import { Type } from "../../utils/types";
import { Button } from 'antd-mobile';


const LoginView = (): ReactElement<ReactNode> => {
    const { state,dispatch } = useContext(IBPayMobile);
    const navigate = useNavigate();
    return (
        <div className="login-view">
            <p>登录</p>
            <p>{state.app_token}</p>
            <Button color="primary" size="small" onClick={() => {
                dispatch({
                    type: Type.SET_TOKEN,
                    payload: {
                        app_token: 'test_token'
                    }
                });
                navigate('/')
            }}>点击登录</Button>
        </div>
    )
};

export default LoginView;
