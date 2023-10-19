import React from "react";
import { Link } from "react-router-dom";

import Img1 from "../assets/img/img10.jpg";
import Img2 from "../assets/img/img11.jpg";
import Img3 from "../assets/img/img14.jpg";
import Img4 from "../assets/img/img15.jpg";

// eslint-disable-next-line
export default Notification = [
  {
    "avatar": (<img src={Img1} alt=""/>),
    "text": (<React.Fragment><strong>Dominador Manuel</strong> et <strong>100 autres personnes</strong> ont réagi à votre commentaire "Dites à votre partenaire que...</React.Fragment>),
    "date": "20 août 08h55",
    "status": "online"
  },
  {
    "avatar": (<img src={Img2} alt="" />),
    "text": (<React.Fragment><strong>Angela Ighot</strong> vous a identifié ainsi que <strong>9 autres</strong> dans une publication.</React.Fragment>),
    "date": "18 août 10h30",
    "status": "online"
  },
  {
    "avatar": (<span className="avatar-initial bg-primary">a</span>),
    "text": (<React.Fragment>De nouvelles annonces ont été ajoutées qui correspondent à votre alerte de recherche <strong>maison à louer</strong></React.Fragment>),
    "date": "15 août 20h10",
    "status": ""
  },
  {
    "avatar": (<img src={Img3} alt="" />),
    "text": (<React.Fragment>Rappel : <strong>Jerry Cuares</strong> vous a invité à aimer <strong>Cuares Surveying Services</strong>. <br /><Link to="/">Accepter</Link> ou <Link to="/">Refuser</Link></React.Fragment>),
    "date": "14 août 23h50",
    "status": "online"
  },
  {
    "avatar": (<img src={Img4} alt="" />),
    "text": (<React.Fragment><strong>Dyanne Aceron</strong> a réagi à votre publication <strong>Roi du Lit</strong></React.Fragment>),
    "date": "10 août 05h30",
    "status": "online"
  }
];


