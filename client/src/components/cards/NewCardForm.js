import { useState } from "react";
import { connect } from "react-redux";

import { Alert } from "../alert/Alert";
import { createCard } from "../../redux/actions/cards.actions";

const NewCardForm = (props) => {
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
    image: ''
  });

  const onChangeInputHandler = e => {
    if (e.target.name === 'isAlive') {
      if (e.target.value === 'alive') {
        setInputValues(prev => ({
          ...prev,
          ...{isAlive: true}
        }));
      } else if (e.target.value === 'dead') {
        setInputValues(prev => ({
          ...prev,
          ...{isAlive: false}
        }));
      }
    } else {
      setInputValues(prev => ({
        ...prev,
        ...{[e.target.name]: e.target.value}
      }));
    }
  };

  const onHandleCreateCard = async () => {
    const formData = new FormData();
    formData.append('image', inputValues.image);
    Object.entries(inputValues).map(([key, value]) => formData.append(key, value));
    props.dispatch(createCard(formData));
    // props.dispatch(createCard(inputValues));

    setInputValues({
      name: '',
      isAlive: '',
      species: '',
      gender: 'male',
      locationTitle: '',
      locationType: '',
      episodeTitle: '',
      episodeAirDate: '',
      series: '',
      image: '',
    });

    props.setIsModalVisible(false);
  };

  return (
    <div className={props.isModalVisible ? 'modal active' : 'modal'} onClick={() => props.setIsModalVisible(false)}>
      <div className={'modalContent'} onClick={e => e.stopPropagation()}>
        <div className={'form'}>
          <div>
            <label>Name</label>
            <input type={'text'} name={'name'} value={inputValues.name} onChange={onChangeInputHandler} />
          </div>

          <div className={'radioInput'}>
            <label>Alive</label>
            <input type={'radio'} name={'isAlive'} value={'alive'} onChange={onChangeInputHandler} />
            &emsp;
            <label>Dead</label>
            <input type={'radio'} name={'isAlive'} value={'dead'} onChange={onChangeInputHandler} />
          </div>

          <div>
            <label>Species</label>
            <input type={'text'} name={'species'} value={inputValues.species} onChange={onChangeInputHandler} />
          </div>

          <div>
            <label>Gender</label>
            <select name={'gender'} value={inputValues.gender} onChange={onChangeInputHandler}>
              <option>male</option>
              <option>female</option>
            </select>
          </div>

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

          <div>
            <label>Image</label>
            <input type={'file'} name={'image'} value={inputValues.image} onChange={onChangeInputHandler} />
          </div>

          {/* {props.alert && <Alert msg={props.alert} />} */}
          
          <button onClick={onHandleCreateCard}>send</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    card: state.cardsReducer.card
  }
};

export default connect(mapStateToProps)(NewCardForm);