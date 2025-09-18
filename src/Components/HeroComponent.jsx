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

/*You will also need to update LogInComponent and RegisterComponent to accept and use the onRegisterClick and onLoginClick props for the buttons/links.*/

export default HeroComponent;
