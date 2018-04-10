import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import InlineError from "../messages/InlineError";


class DonatePage extends React.Component {
    state = {
        data: {
            amount: '',
            balance: 5000
        },
        loading: false,
        errors: {}
    };

    
    onChange = e => 

      this.setState({
        data: {...this.state.data, [e.target.name]: e.target.value}
    });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        
    };

    validate = (data) => {
        const errors = {};
        if(data.amount > data.balance) errors.amount = "Your balance is not enough";
        return errors;
    }

  

    render() {
        const { data, errors } = this.state;
        const formStyle={
            position: "relative",
            left: "20%",
            paddingTop: "40%"
      
      
          }
        return (
            <div>
            <Form onSubmit={this.onSubmit} style={formStyle}>
            
            <div> Your balance: {this.state.data.balance} ETH</div>
          
            <Form.Field error={!!errors.amount}>
            <label htmlFor="amount">The amount you would like to donate:</label>
            <input type="amount" id="amount" name = "amount" placeholder="0"
            value = {this.state.data.amount}
            onChange={this.onChange}
            />ETH
            {errors.amount && <InlineError text={errors.amount} />}
            </Form.Field>
            <Link to="/success"> <Button primary>Donate</Button></Link>
            </Form>
            </div>
          
        )
    }
}

export default DonatePage;