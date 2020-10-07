// eslint-disable-next-line
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showInfoModal } from '../redux/slices/infoModalSlice';
import '../styling/NavigationBar.css';

const NavigationBar = (): JSX.Element => {
  const dispatch = useDispatch();

  const history = useHistory();
  const leaveChat = (): void => {
    history.goBack();
  };

  const openModal = () => {
    dispatch(showInfoModal());
  };

  return (
    <section className='navBar'>
      <button 
        className='navBar__btns'
        type='button'
        onClick={() => leaveChat()}
        aria-label='leave chat button'
      >
        <i className="navBar__icons icons__back fas fa-chevron-left"></i>
      </button>
      <p className='navBar__header'>Chat room</p>
      <button
        className='navBar__btns'
        type='button'
        onClick={() => openModal()}
        aria-label='info button'
      >
        <i className="navBar__icons icons__info fas fa-info-circle"></i>
      </button>
    </section>
  );
};

export default NavigationBar;
