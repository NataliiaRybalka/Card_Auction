import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { Alert } from "../alert/Alert";
import { createSet } from "../../redux/actions/sets.actions";

const NewSetForm = (props) => {
  const [inputValues, setInputValues] = useState({
    name: ''
  });
  const [msg, setMsg] = useState();
  const history = useHistory();

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

  const onHandleCreateSet = async () => {
    for (const input in inputValues) {
      if (inputValues[input] === '') {
        setMsg(`All fields must be filled!`);
        return;
      }
    }

    props.dispatch(createSet(inputValues));

    setInputValues({
      name: ''
    });

    history.go(0);
  };

  return (
    <div className={props.isModalVisible ? 'modal active' : 'modal'} onClick={() => props.setIsModalVisible(false)}>
      <div className={'modalContent'} onClick={e => e.stopPropagation()}>
        <div className={'form'}>
          <div>
            <label>Name</label>
            <input type={'text'} name={'name'} value={inputValues.name} onChange={onChangeInputHandler} />
          </div>

          {msg && <Alert msg={msg} />}
          
          <button onClick={onHandleCreateSet}>send</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    set: state.setsReducer.set
  }
};

export default connect(mapStateToProps)(NewSetForm);