import React from "react";
import { Link } from "react-router-dom";
import './Vote.css';
class VotePage extends React.Component {

render() {

   

    const formStyle={
        position: "relative",
        width: "120%"
        
  
  
      }

return(
<div >
<h2 textAlign="center">Your Voting Options</h2>
<div className="ui card" style={formStyle}>
    <div className="content">
     
      <div className="header">LovePanda</div>
      <div className="meta">Chengdu, China</div>
      <div className="description">There are 50 wild pandas in Chengdu needing money for their protection.
      </div>
    </div>
    <div class="extra content">
      <div class="ui two buttons">
   <Link to="/thank">  
   <button class="ui green basic button">Vote</button>
   </Link>
 
        <button class="ui green basic button" role="button">More Details</button>
        
      </div>
    </div>
 </div>

<div className="ui card" style={formStyle}>
    <div className="content">
     
      <div className="header">HeartBeats</div>
      <div className="meta">Ohio, USA</div>
      <div className="description">Save 27 children with heart problems! 
      </div>
    </div>
    <div class="extra content">
      <div class="ui two buttons">
      <Link to="/thank"> 
        <button class="ui green basic button" role="button">Vote</button>
        </Link>
        <button class="ui green basic button" role="button">More Details</button>
      </div>
    </div>
 </div>

 <div className="ui card" style={formStyle}>
    <div className="content">
     
      <div className="header">VAD</div>
      <div className="meta">Africa, Southeast Asia</div>
      <div className="description">Vitamin A deficiency (VAD) is the leading cause of preventable blindness in children and increases the risk of disease and death from severe infections.
      </div>
    </div>
    <div class="extra content">
      <div class="ui two buttons">
      <Link to="/thank"> 
        <button class="ui green basic button" role="button">Vote</button>
        </Link>
        <button class="ui green basic button" role="button">More Details</button>
      </div>
    </div>
 </div>
</div>
)


}

}
export default VotePage;