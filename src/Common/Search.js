import React from 'react';


class Search extends React.Component{
    constructor(){
        super();
        this.state = {
            value:''
        }
    }
    handleChange = (event) =>{
        this.setState({value:event.target.value});
    }
    
    render(){
        const value = this.state.value;
        return(
            <div className='input-group'>
                <div className='form-outline'>
                    <input type="search" id="titleSearch" width="500" placeholder={this.props.placeholder} className='form-control' value={value} 
                            onChange={this.handleChange} /> 
                </div>
                <button type="button" className="btn btn-outline-primary" onClick={() => this.props.handleSearch(value)}>
                    Search
                </button>
                <div>&nbsp;&nbsp;</div>
                <label style={{paddingTop:5+"px"}}>Sort By</label>
                <div>&nbsp;&nbsp;</div>
                <select className="btn btn-outline-primary" defaultValue="Average Rating">
                    <option value="Average Rating">Average Rating</option>
                </select>
                <div>&nbsp;&nbsp;</div>
                <select onChange={this.props.onSelectChange} className="btn btn-outline-primary">
                    <option value="-1">Select Order</option>
                    <option value="asc" >ASC</option>
                    <option value="desc" >DESC</option>
                </select>
            </div>
        );
    }
}

export default Search;