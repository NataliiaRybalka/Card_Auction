import { useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login';

import { loginGoogle } from '../../redux/actions/auth.actions';

export const LoginFacebook = () => {
  const dispatch = useDispatch();

  const onLoginSuccessHandler = async (facebookData) => {
    const userData = {
      accessToken: facebookData.accessToken,
      userID: facebookData.userID
    };

    dispatch(loginGoogle(userData));
  };

  return (
    <div id={'facebookLogin'}>
      <FacebookLogin
        appId="1032368474271987"
        autoLoad={false}
        callback={onLoginSuccessHandler}
        icon="fa-facebook"
        textButton="Login"
        cssClass="kep-login-facebook-[button-size] facebookLoginClass"
      />
    </div>
  );
};