import React from 'react';
import { connect } from 'react-redux';
import {useHistory} from 'react-router-dom';
import localStorage from 'local-storage';
import './Ecart.css';

class Ecart extends React.Component{
    
    submitClick = (price) =>{
        
        this.props.history.push({
            pathname:'/checkout',
            state:{data:price}
        });

    }
     
    render(){
        if(window.localStorage.length <= 0){
            return (
                <div style={{color:"red",textAlign:"center"}} className="Error">
                    No Items in Cart
                </div>
            );
        }
        var elems = localStorage.get('cartEle');
        var totalEle = elems.length;
        var price = 0;
        return(
            <div className="ecart-list">
                <div className="row">
                    
                    <div className="col-75">
                        <div className="container-checkout">
                            <h4>Cart
                                <span className="price" style={{color:"black"}}>
                                <b>{totalEle}</b>
                                </span>
                            </h4>
                            {
                                elems.map(function(elm,index){
                                    price = price + elm.price;
                                    return(
                                        <p>
                                            <a href="#">{elm.title} <span className="price">${elm.price}</span></a>
                                        </p>
                                    );
                                })
                            }
                            <hr></hr>
                            <p>Total <span className="price" style={{color:"black"}}><b>${price}</b></span></p>
                            <input type="submit" value="Continue to checkout" onClick={() => this.submitClick(price)} className="btn-submit"></input>
                        </div>
                    </div>
                </div>
                
                {/*
                    elems.map(function(elm,index){
                        return(
                            <div style={{padding:20+"px", width:100+"%"}} className="book" 
                                 key={elm.bookID} >
                                <div className="">
                                    <div className="row">
                                        <div className="">
                                            <div className="card h-120">
                                                <div className="card-body">
                                                    <h6 className="card-title">
                                                        <a href="">{elm.title}</a>
                                                    </h6>
                                                    <h5>${elm.price}</h5>
                                                    <p className="card-text">{elm.authors}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                */ }
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {bookReducer:state.bookReducer}
}

export default connect(mapStateToProps)(Ecart);