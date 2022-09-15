
import { ReactElement, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountCard = (): ReactElement<ReactNode> => {
    const navigate = useNavigate();
    return (
        <div className='account-card'>
            <div className='sign-out' onClick={() => {
                localStorage.clear();
                navigate('/login')
            }}>
                <span className='iconfont icon-tuichu-2'></span>
                退出
            </div>
            <div className='ib-avatar'>
                <img src={require('../../../assets/images/ib_avatar.png')} alt="" />
            </div>
            <p className='account-name'>派大星</p>
            <div className='auth-status'>
                未绑定
                <img src={require('../../../assets/images/right_arrow.png')} alt="" />
            </div>
            <div className='login-msg'>
                <div className='msg-public'>
                    <p>上次登录时间</p>
                    <p>2022-05-15 12:56:56</p>
                </div>
                <div className='msg-public'>
                    <p>邮箱</p>
                    <p>1332568474@gmail.com</p>
                </div>
            </div>
        </div>
    )
};
export default AccountCard;