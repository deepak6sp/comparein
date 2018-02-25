import React from 'react';

const PopUp = (props: any) => {

  return (
    <section id="myNav" className="overlay">
      <a href="javascript:void(0)" className="closebtn" onClick={props.handlePopUpClose}>&times;</a>
      <div className="overlay-content">
        {props.children}
      </div>
    </section>
  );
}

export default PopUp
