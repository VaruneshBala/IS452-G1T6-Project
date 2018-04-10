import React from "react";
import { Link } from "react-router-dom";

class VotePage extends React.Component {

render() {
return(

<div className="ui card">
    <div className="content">
      <img src="/assets/images/avatar/large/steve.jpg" className="ui mini right floated image" />
      <div className="header">LovePanda</div>
      <div className="meta">Chengdu, China</div>
      <div className="description">Steve wants to add you to the group <strong>best friends</strong>
      </div>
    </div>
    <div class="extra content">
      <div class="ui two buttons">
        <button class="ui green basic button" role="button">Vote</button>
        <button class="ui red basic button" role="button">Details</button>
      </div>
    </div>
 </div>

)


}

}
export default VotePage;