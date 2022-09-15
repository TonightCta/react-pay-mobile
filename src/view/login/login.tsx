import { Button } from "antd-mobile";
import { LeftOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Find, Login } from "../../utils/types";
import './index.scss'
// import { useNavigate } from "react-router-dom";
import { IBPayMobile } from "../../route/router";
import { Type } from "../../utils/types";
import { useNavigate } from "react-router-dom";
// import { Button } from 'antd-mobile';


const LoginView = (): ReactElement<ReactNode> => {
    const { dispatch } = useContext(IBPayMobile);
    const navigate = useNavigate();

    //倒计时
    const [count, setCount] = useState<number>(60);
    const cbSaver: any = useRef();
    const timer = useRef<NodeJS.Timer>();
    cbSaver.current = () => {
        setCount(count - 1);
    };
    const countDown = useCallback((): void => {
        timer.current = setInterval(() => {
            cbSaver.current();
        }, 1000);
    }, []);

    useEffect(() => {
        if (count < 0) {
            clearInterval(timer.current);
            setCount(60)
        };
    }, [count]);

    useEffect(() => {
        return () => {
            clearInterval(timer.current);
        }
    }, [])
    //操作类型 ----> 1 - 登录 ｜ 2 - 忘记密码
    const [indexType, setIndexType] = useState<number>(1);
    //查看密码
    const [viewType, setViewType] = useState<string>('password');
    //Find view password
    const [viewPass,setViewPass] = useState<{new:string,repeat:string}>({
        new:'password',
        repeat:'password'
    })
    //输入信息
    const [inpLogin, setInpLogin] = useState<Login>({
        email: '',
        password: '',
        auth_code: ''
    });
    const [findMsg, setFindMsg] = useState<Find>({
        email: '',
        code: '',
        new_pass: '',
        repeat_pass: ''
    })
    return (
        <div className="login-view">
            <div className="logo-box">
                <img src={require('../../assets/images/logo.png')} alt="" />
                <p>商家平台</p>
            </div>
            <p className="view-name" onClick={() => {
                setIndexType(1)
            }}>
                {indexType === 2 && <span><LeftOutline fontSize={16} color="rgba(255,255,255,.6)" /></span>}
                {indexType === 1 ? '登录' : '忘记密码'}
            </p>
            {indexType === 1
                ?
                //登录
                <div className="input-box">
                    <div className="inp-box">
                        <p className="inp-label">邮箱</p>
                        <div className="inp-inner">
                            <div className="iconfont icon-duanxinyouxiang"></div>
                            <input type="text" placeholder="请输入您的邮箱" value={inpLogin.email} onChange={(e) => {
                                setInpLogin({
                                    ...inpLogin,
                                    email: e.target.value
                                })
                            }} autoComplete="off" />
                            {inpLogin.email && <div onClick={() => {
                                setInpLogin({
                                    ...inpLogin,
                                    email: ''
                                })
                            }} className="iconfont other-icon icon-chahao-2"></div>}
                        </div>
                    </div>
                    <div className="inp-box">
                        <p className="inp-label">登录密码</p>
                        <div className="inp-inner">
                            <div className="iconfont icon-weibiaoti--"></div>
                            <input type={viewType} value={inpLogin.password} onChange={(e) => {
                                setInpLogin({
                                    ...inpLogin,
                                    password: e.target.value
                                })
                            }} placeholder="输入您的登录密码" autoComplete="new-password" />
                            <div className={`iconfont other-icon ${viewType === 'password' ? 'icon-yanjing-guanbeifen' : 'icon-yanjing-guan'}`} onClick={() => {
                                setViewType(viewType === 'password' ? 'text' : 'password')
                            }}></div>
                        </div>
                    </div>
                    <div className="inp-box">
                        <p className="inp-label">谷歌验证码</p>
                        <div className="inp-inner">
                            <div className="iconfont icon-auth-icon"></div>
                            <input type="number" placeholder="输入谷歌验证码" value={inpLogin.auth_code} onChange={(e) => {
                                setInpLogin({
                                    ...inpLogin,
                                    auth_code: e.target.value
                                })
                            }} autoComplete="new-password" />
                        </div>
                    </div>
                    <p className="forget-pass" onClick={() => {
                        setIndexType(2)
                    }}>忘记密码？</p>
                    <div className="oper-btn">
                        <Button color="primary" block onClick={() => {
                            dispatch({
                                type:Type.SET_TOKEN,
                                payload:{
                                    app_token:'test_token'
                                }
                            });
                            navigate('/')
                        }}>登录</Button>
                    </div>
                </div>
                // 忘记密码
                : <div className="input-box">
                    <div className="inp-box">
                        <p className="inp-label">邮箱</p>
                        <div className="inp-inner">
                            <div className="iconfont icon-duanxinyouxiang"></div>
                            <input type="text" placeholder="请输入您的邮箱" value={findMsg.email} onChange={(e) => {
                                setFindMsg({
                                    ...findMsg,
                                    email: e.target.value
                                })
                            }} autoComplete="off" />
                            {findMsg.email && <div className="iconfont icon-chahao-2" onClick={() => {
                                setFindMsg({
                                    ...findMsg,
                                    email: ''
                                })
                            }}></div>}
                        </div>
                    </div>
                    <div className="inp-box">
                        <p className="inp-label">验证码</p>
                        <div className="inp-inner">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div className="iconfont icon-yanzhengma-2"></div>
                                <input type="number" className="other-inp-width" placeholder="请输入邮箱验证码" value={findMsg.code} onChange={(e) => {
                                    setFindMsg({
                                        ...findMsg,
                                        code: e.target.value
                                    })
                                }} autoComplete="new-password" />
                            </div>
                            <div className="send-code" onClick={count === 60 ? () => {
                                countDown()
                            } : () => { }}>
                                {count === 60 ? '获取验证码' : `${count}s`}
                            </div>
                        </div>
                    </div>
                    <div className="inp-box">
                        <p className="inp-label">新密码</p>
                        <div className="inp-inner">
                            <div className="iconfont icon-weibiaoti--"></div>
                            <input type={viewPass.new} placeholder="请输入新密码" value={findMsg.new_pass} onChange={(e) => {
                                setFindMsg({
                                    ...findMsg,
                                    new_pass: e.target.value
                                })
                            }} autoComplete="new-password" />
                            <div className={`iconfont other-icon ${viewPass.new === 'password' ? 'icon-yanjing-guanbeifen' : 'icon-yanjing-guan'}`} onClick={() => {
                                setViewPass({
                                    ...viewPass,
                                    new:viewPass.new === 'password' ? 'text' : 'password'
                                })
                            }}></div>
                        </div>
                    </div>
                    <div className="inp-box">
                        <p className="inp-label">确认密码</p>
                        <div className="inp-inner">
                            <div className="iconfont icon-weibiaoti--"></div>
                            <input type={viewPass.repeat} placeholder="请再次输入新密码" value={findMsg.repeat_pass} onChange={(e) => {
                                setFindMsg({
                                    ...findMsg,
                                    repeat_pass: e.target.value
                                })
                            }} autoComplete="new-password" />
                            <div className={`iconfont other-icon ${viewPass.repeat === 'password' ? 'icon-yanjing-guanbeifen' : 'icon-yanjing-guan'}`} onClick={() => {
                                setViewPass({
                                    ...viewPass,
                                    repeat:viewPass.repeat === 'password' ? 'text' : 'password'
                                })
                            }}></div>
                        </div>
                    </div>
                    <div className="oper-btn">
                        <Button color="primary" block>确认</Button>
                    </div>
                </div>
            }
        </div>
    )
};

export default LoginView;
