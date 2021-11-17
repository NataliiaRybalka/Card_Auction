import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Alert } from "../alert/Alert";
import { createCard } from "../../redux/actions/cards.actions";

export const NewCardForm = (props) => {
  const { isModalVisible, setIsModalVisible } = props;
  const [inputValues, setInputValues] = useState({
    name: '',
    isAlive: '',
    species: '',
    gender: 'male',
    locationTitle: '',
    locationType: '',
    episodeTitle: '',
    episodeAirDate: '',
    series: '',
    image: ''
  });
  const [msg, setMsg] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const onChangeInputHandler = e => {
    if (e.target.name === 'image') {
      setInputValues(prev => ({
        ...prev,
        ...{image: e.target.files[0]}
      }));
    } else {
      setInputValues(prev => ({
        ...prev,
        ...{[e.target.name]: e.target.value}
      }));
    }
  };

  const onHandleCreateCard = async () => {
    for (const input in inputValues) {
      if (inputValues[input] === '') {
        setMsg(`All fields must be filled!`);
        return;
      }
    }

    const formData = new FormData();
    formData.append('image', inputValues.image);
    Object.entries(inputValues).map(([key, value]) => formData.append(key, value));
    dispatch(createCard(formData));

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
      image: ''
    });

    history.go(0);
  };

  return (
    <div className={isModalVisible ? 'modal active' : 'modal'} onClick={() => setIsModalVisible(false)}>
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
            <input type={'file'} name={'image'} value={undefined} onChange={onChangeInputHandler} />
          </div>

          {msg && <Alert msg={msg} />}
          
          <button onClick={onHandleCreateCard}>send</button>
        </div>
      </div>
    </div>
  );
};