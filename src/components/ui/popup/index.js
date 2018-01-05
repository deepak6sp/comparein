import React from 'react';

const PopUp = props => {
  const _handleClick = (e) => {
    e.target.parentElement.style.display = "none";
    console.log("close btn clicked");
  };

  return (
    <section id="myNav" className="overlay">
      <a href="javascript:void(0)" className="closebtn" onClick={props.handleClick}>&times;</a>
      <div className="overlay-content">
        {props.children}
      </div>
    </section>
  );
}

export default PopUp
