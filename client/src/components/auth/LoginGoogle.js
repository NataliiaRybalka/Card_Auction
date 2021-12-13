import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';

import { loginGoogle } from '../../redux/actions/auth.actions';

export const LoginGoogle = () => {
  const dispatch = useDispatch();

  const onLoginSuccessHandler = async (googleData) => {
    const userData = {
      tokenId: googleData.tokenId
    };

    dispatch(loginGoogle(userData));
  };

  return (
    <div id={'googleLogin'}>
      <GoogleLogin
        clientId="8121478236-5g8beul2l2j9r31r280ar2huptgo4nnb.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={onLoginSuccessHandler}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};