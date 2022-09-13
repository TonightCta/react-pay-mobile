import React from 'react';
const LoginView = React.lazy(() => import('../view/login/login'));
const OverView = React.lazy(() => import('../view/overview/overview'));
const MerchantView = React.lazy(() => import('../view/merchant/merchant'));
const NotFoundView = React.lazy(() => import('../view/not_found/n_found'));

export {
    LoginView,
    OverView,
    MerchantView,
    NotFoundView,
}