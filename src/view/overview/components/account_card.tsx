
import { ReactElement, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { IBPayMobile } from '../../../route/router';
import { useEffect } from 'react';
import SelectMerchant from '../../merchant/components/filter/components/select_merchant';
import { Type } from '../../../utils/types';

interface Account {
    name: string,
    email: string,
    ga: number,
    is_admin: boolean,
    last_login_time: string,
    mch_id: string,
}

const AccountCard = (): ReactElement<ReactNode> => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(IBPayMobile);
    const [selectMerchantBox, setSelectMerchantBox] = useState<boolean>(false);
    const admin = JSON.parse(state.account || '{}')?.merchantInfo.is_admin;
    const [account, setAccount] = useState<Account>({
        name: '',
        email: '',
        ga: 0,
        is_admin: false,
        last_login_time: '',
        mch_id: '',
    });
    useEffect(() => {
        setAccount(JSON.parse(state.account || '{}')?.merchantInfo);
    }, []);
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
            <p className='account-name' onClick={admin ? () => {
                setSelectMerchantBox(true)
            } : () => { }}>{account.name}
                {admin && <img src={require('../../../assets/images/down_icon.png')} alt="" />}
            </p>
            {
                account.ga != undefined && <div className={`auth-status ${account.ga === 1 && 'has-auth'}`}>
                    {account.ga === 0 ? '未' : '已'}绑定
                    {account.ga === 0 && <img src={require('../../../assets/images/right_arrow.png')} alt="" />}
                </div>
            }
            <div className='login-msg'>
                <div className='msg-public'>
                    <p>上次登录时间</p>
                    <p>{account.last_login_time}</p>
                </div>
                <div className='msg-public'>
                    <p>邮箱</p>
                    <p>{account.email}</p>
                </div>
            </div>
            <SelectMerchant value={selectMerchantBox} resetValue={(value: boolean) => {
                setSelectMerchantBox(value)
            }} selectMerchant={(value: any) => {
                setAccount(value);
                dispatch({
                    type: Type.SET_MERCHANT,
                    payload: {
                        merchant_id: value.id
                    }
                })
            }} />
        </div>
    )
};
export default AccountCard;