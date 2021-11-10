import { useState } from "react";
import { connect } from "react-redux";

import { Alert } from "../alert/Alert";

const NewCardForm = () => {
  const [inputValues, setInputValues] = useState({
    name: '',
    isAlive: '',
    species: '',
    gender: '',
    locationTitle: '',
    locationType: '',
    episodeTitle: '',
    episodeAirDate: '',
    series: '',
    image: '',
  });

  const onChangeInputHandler = e => {
    setInputValues(prev => ({
        ...prev,
        ...{[e.target.name]: e.target.value}
    }));
  };

  const onHandleLogin = async () => {
    // props.dispatch(login(inputValues));

    setInputValues({
      name: '',
      isAlive: '',
      species: '',
      gender: '',
      locationTitle: '',
      locationType: '',
      episodeTitle: '',
      episodeAirDate: '',
      series: '',
      image: '',
    });
  };

  return (
    <div className={'form'}>
    <div>
      <label>Name</label>
      <input type={'text'} name={'name'} value={inputValues.name} onChange={onChangeInputHandler} />
    </div>

    {/* <div>
      <label>Is Alive</label>
      <input type={'text'} name={'isAlive'} value={inputValues.isAlive} onChange={onChangeInputHandler} />
    </div> */}

    <div>
      <label>Species</label>
      <input type={'text'} name={'species'} value={inputValues.species} onChange={onChangeInputHandler} />
    </div>

    {/* <div>
      <label>Gender</label>
      <input type={'text'} name={'gender'} value={inputValues.gender} onChange={onChangeInputHandler} />
    </div> */}

    <div>
      <label>Location Title</label>
      <input type={'text'} name={'locationTitle'} value={inputValues.locationTitle} onChange={onChangeInputHandler} />
    </div>

    <div>
      <label>Location Type</label>
      <input type={'text'} name={'locationType'} value={inputValues.locationType} onChange={onChangeInputHandler} />
    </div>

    <div>
      <label>Episode Title</label>
      <input type={'text'} name={'episodeTitle'} value={inputValues.episodeTitle} onChange={onChangeInputHandler} />
    </div>

    <div>
      <label>Episode Air Date</label>
      <input type={'text'} name={'episodeAirDate'} value={inputValues.episodeAirDate} onChange={onChangeInputHandler} />
    </div>

    <div>
      <label>Series</label>
      <input type={'text'} name={'series'} value={inputValues.series} onChange={onChangeInputHandler} />
    </div>

    {/* <div>
      <label>Image</label>
      <input type={'text'} name={'image'} value={inputValues.image} onChange={onChangeInputHandler} />
    </div> */}

    {/* {props.alert && <Alert msg={props.alert} />} */}
    
    <button onClick={onHandleLogin}>send</button>
  </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    userTokens: state.authReducer.userTokens,
    alert: state.alertReducer.alert
  }
};

export default connect(mapStateToProps)(NewCardForm);