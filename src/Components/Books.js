import React from 'react';
import Pagination from 'react-js-pagination';
import {connect} from 'react-redux';
import {addToCart,removeFromCart} from '../Store/Actions/CartActions';
import localStorage from 'local-storage';
import Search from '../Common/Search';

class Books extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            images:[],
            filteredData:this.props.results,
            rowsPerPage: 10,
            rows:0,
            start:0,
            end:9,
            activePage:1,
            searchOption:false,
            sortEnable:false,
            orderBy:'',
            cartEle:[],
            cartFalg:false
        }
    }
    componentWillMount(){
        fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/bookimage816b123.json",{
            method:'GET',
            headers:{
                'Content-Type':'application/json; charset=UTF-8'
            }
        }).then(response => response.json()).then((data) => {
            if(data != null){
                this.setState({images:data});
            }
        });
    }

    handlePageChange(pageNumber) {
        let pageStart = (this.state.rowsPerPage)*(pageNumber-1);
        let pageEnd = this.state.rowsPerPage * pageNumber;
        if(pageEnd >= this.props.results.length){
            pageEnd = this.props.results.length;
        }
        this.setState({
            activePage: pageNumber,
            start:pageStart,
            end:pageEnd
        });
    }

    handleSearch = (value) => {
        var searchText = value;
        {/*var filteredData = this.props.results.filter(function(elm,index){
            var title = elm.title;
            if(typeof elm.title === "number"){
                 = elm.title.toString();
            }
            var bookTitle = title && title.toLowerCase();
            if(bookTitle.indexOf(searchText) > -1){
                return elm;
            }
        });*/}
        var filteredData = this.props.results.filter(function(elm,index){
            if(typeof elm.title === "number"){
                if(elm.title == searchText){
                    return elm;
                }
            }else{
                var bookTitle = elm.title;
                if(bookTitle.indexOf(searchText) > -1){
                    return elm;
                }
            }
        });
        this.setState({filteredData:filteredData,searchOption:true});
    }

    onSelectChange = (event) =>{
        this.setState({sortEnable:true,orderBy:event.target.value});
    }

    addingToCart = (elm,img) =>{
        var ele = [];
        const len = window.localStorage.length;
        var check = len > 0;
        var dupFound = false;
        if(check){
            var arr = localStorage.get('cartEle');
            arr.map(function(el){
                if(el.bookID === elm.bookID){
                    dupFound = true;
                }
            });
            ele = [...arr,elm];
        }else{
            var arr = [];
            ele = [...arr,elm];
        }
       if(!dupFound){
            localStorage.set('cartEle',ele);
            localStorage.set(elm.bookID,img);
       } 
    }

    render(){
        let results = [...this.props.results];
        if(this.state.filteredData.length > 0 || this.state.searchOption){
            results = this.state.filteredData;
        }
        let sortedResults = [];
        if(this.state.sortEnable){
            if(this.state.orderBy === 'asc'){
                sortedResults = results.sort((o1,o2) => parseFloat(o1.avgRating) - parseFloat(o2.avgRating));
            }else{
                sortedResults = results.sort((o1,o2) => parseFloat(o2.avgRating) - parseFloat(o1.avgRating));
            }
            results = sortedResults;
        }
        const images = this.state.images;
        if(!results || !results.length){
            return (
                <div style={{color:"red",textAlign:"center"}} className="Error">
                    No Records Found
                </div>
            );
        }

        let start = this.state.start;
        let end = this.state.end;
        let rows = results.length;
        return(
            <div className="books">
                <div>&nbsp;&nbsp;</div>
                <Search placeholder="Enter Book title and hit search button"
                  handleSearch={this.handleSearch} 
                  onSelectChange={this.onSelectChange}/>
                {/*<Search placeholder="Enter Book title and hit search button" handleSearch={this.handleSearch} />*/}
            <div className="books-list row">
                {
                results.slice(start,end).map(function(elm,index){
                    return(
                    <div style={{padding:20+"px"}} className="book col-xs-12 col-sm-3 mb10"  key={elm.bookID}>
                        <div className="br-1 pd-15 h-300">
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="card h-100">
                                        <a href="">
                                            {images.length > 0 &&
                                                <img className="card-img-top" src={elm.image} 
                                                    alt="Book Card" width="90" height="150"/>    
                                            }
                                        </a>
                                        <div className="card-body">
                                            <h6 className="card-title">
                                                <a href="">{elm.title}</a>
                                            </h6>
                                            <h5>${elm.price}</h5>
                                            <p className="card-text">{elm.authors}</p>
                                            <p className="card-text">Average Rating : {elm.avgRating}</p>
                                            <a href="" onClick={() => this.addingToCart(elm, elm.image)}> Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    );
                }.bind(this))
            }
            </div>
                <div className="row">
                    <Pagination
                            prevPageText='Prev'
                            nextPageText='Next'
                            firstPageText='First'
                            lastPageText='Last'
                            innerClass='pagination float-right'
                            itemClass='page-item'
                            linkClass='page-link'
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.rowsPerPage}
                            totalItemsCount={rows}
                            onChange={this.handlePageChange.bind(this)} >
                        </Pagination>
                </div>
            </div>
        );

    }
}

const mapStateToProps = state =>{
    console.log("reducer");
    return {bookReducer:state.bookReducer};
}

const mapDispatchtoProps = dispatch => {
    return {
        onAddToCart: (title,price,author) => {
            dispatch(addToCart(title,price,author))
        }
    }
}

export default connect(mapStateToProps,mapDispatchtoProps)(Books);