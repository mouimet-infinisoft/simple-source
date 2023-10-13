import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="main-footer">
      <span>&copy; 2023. Infinisoft World. Tous droits réservés.</span>
      <span>Created by: <Link to="https://infinisoft.world" target="_blank">Infinisoft World</Link></span>
    </div>
  )
}