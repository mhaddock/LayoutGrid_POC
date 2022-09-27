import * as React from "react";
import { Link } from "react-router-dom";

export const BackLink: React.FC<{}> = () => (
  <div id="BackLink">
    <Link to="/">{"◄ Layouts"}</Link>
  </div>
);
