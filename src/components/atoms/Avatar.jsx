import React from "react";
import defaultavatar from './defaultavatar.png'

export default function Avatar({ img = defaultavatar, size = 'xl', shape = 'rounded', status = "" }) {

  const handleImageError = (event) => {
    event.target.src = defaultavatar;
  };

  return (
    <div className={`avatar ${size ? "avatar-" + size : ""} ${shape ? "avatar-" + shape : ""} ${status ? status : ""}`}>
      <img src={img} alt="avatar picture" onError={handleImageError} />
    </div>
  );

  // } else if (props.initial) {
  //   return (
  //     <div className={`avatar ${props.size ? "avatar-" + props.size : ""} ${props.shape ? "avatar-" + props.shape : ""} ${props.status ? props.status : ""}`}>
  //       <span className="avatar-initial">{props.initial}</span>
  //     </div>
  //   );
  // }
}