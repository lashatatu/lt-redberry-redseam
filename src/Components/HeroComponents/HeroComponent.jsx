import React from "react";
import HeroImageComponent from "./HeroImageComponent.jsx";
import LogInComponent from "./LogInComponent.jsx";
import RegisterComponent from './RegisterComponent.jsx';

const HeroComponent = ({showRegister,setShowRegister}) => {

  return (
    <div className='min-h-screen flex'>
      <HeroImageComponent />
      {showRegister ? (
        <RegisterComponent onLoginClick={() => setShowRegister(false)} />
      ) : (
        <LogInComponent onRegisterClick={() => setShowRegister(true)} />
      )}

    </div>
  );
};

export default HeroComponent;
