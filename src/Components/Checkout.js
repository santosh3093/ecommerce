import React, { useDebugValue } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import localStorage from 'local-storage';

function Checkout(props){
    
    const publishkey = 'pk_test_51ICu1LEyZv4AAcwS7QflrpfQ4SI1fW5sEaZTC9tJJAr97kBnFxuVIVZxxdB9tRCOD7prVgbFYfzCDbz2ddy8FGYD00s2q0AFKp';
    const stripePrice = props.location.state.data;
    const desc =  "Your Total is "+stripePrice;
    const onToken = (token) =>{
        const data = {
            description:'Your Total Payment is 231',
            amount:231,
            currency:'USD',
            stripeEmail:'santosh.kalyan21@gmail.com',
            token:token.id
        }
        fetch('http://localhost:8080/payment',{
            method:'POST',
            headers:{
                'Content-Type':'application/json; charset=UTF-8'
            },
            body:JSON.stringify(data)
        }).then((response) => {
            if(response.status == '200'){
                alert("Payment Success");
                localStorage.clear();
                props.history.push('/');   
            }
        }).catch((error) => {
            alert("Payment Failure");
        })
    }
    return(
        <div className = "stripe-checkout" style={{textAlign:"center"}}>
        <StripeCheckout
            amount={stripePrice}
            lable="Pay Now"
            name="Visa Card"
            billingAddress
            shippingAddress
            image
            description={desc}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishkey}
            currency="USD"/>
        </div>
    );

}

export default Checkout;