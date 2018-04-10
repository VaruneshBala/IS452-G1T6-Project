import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
<div>
    <h1>Home Page</h1>
    <div>
    <Link to="/donate">Donate</Link>
    </div>
    <div>
    <Link to="/vote">Vote opens</Link>
   </div>
 </div>

);

export default HomePage;