
import { Popup } from 'antd-mobile';
import { CloseOutline, SearchOutline } from 'antd-mobile-icons';
import { ReactElement, ReactNode, useState } from 'react';
import { useEffect } from 'react';
import './index.scss'

interface Props {
    value: boolean,
    merchartResult: (merchant: string) => void,
    resetValue: (value: boolean) => void;
}

const SelectMerchant = (props: Props): ReactElement<ReactNode> => {
    const [visible, setVisible] = useState<boolean>(false);
    useEffect(() => {
        setVisible(props.value)
    }, [props.value]);
    const closePopup = () => {
        setVisible(false);
        props.resetValue(false);
    };
    const merchantList: string[] = [
        '海绵宝宝',
        '派大星',
        '蟹老板',
        '姗蒂',
        '章鱼哥'
    ]
    return (
        <div>
            <Popup visible={visible} onMaskClick={() => {
                closePopup()
            }}>
                <div className='select-merchant'>
                    <p className='merchant-title'>
                        选择商家
                        <CloseOutline onClick={() => {
                            closePopup()
                        }} />
                    </p>
                    {/* <div className='search-inp'>
                        <input type="text" placeholder='请输入商家名称' />
                        <span><SearchOutline /></span>
                    </div> */}
                    <ul>
                        {
                            merchantList.map((item: string, index: number): ReactElement => {
                                return (
                                    <li key={index} onClick={() => {
                                        props.merchartResult(item);
                                        closePopup();
                                    }}>{item}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </Popup>
        </div>
    )
};

export default SelectMerchant;