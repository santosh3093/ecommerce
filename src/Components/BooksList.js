import React,{useState,useEffect}  from 'react';
import Books from './Books';

class BooksList extends React.Component{
    constructor(){
        super();
        this.state = {
            results:[]
        }
    }
    componentWillMount(){
        fetch("http://localhost:8080/getBookDetails",{
            method:'GET',
            headers:{
                'Content-Type':'application/json; charset=UTF-8'
            }
        }).then(response => response.json()).then((data) => {
            if(data != null){
                this.setState({results:data});
            }
        });
        {/*fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json",{
            method:'GET',
            headers:{
                'Content-Type':'application/json; charset=UTF-8'
            }
        }).then(response => response.json()).then((data) => {
            if(data != null){
                this.setState({results:data});
            }
        });*/}
    }
    render(){
        return(
            <div className="books-list container">
                <div className="row">
                    <div>
                        <Books results={this.state.results}></Books>
                    </div>
                </div>
            </div>
        );
    }
}

{/*function BooksList(){
    const [results, setResults] = useState([]);
    useEffect(() => {
        fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json",{
            method:'GET',
            headers:{
                'Content-Type':'application/json; charset=UTF-8'
            }
        }).then(response => response.json()).then((data) => {
            if(data != null){
                setResults(data);
            }
        });
    },[]);
    return(
        <div className="books-list container">
            <div className="row">
                <div>
                    <Books results={results}></Books>
                </div>
            </div>
        </div>
    );
}*/}

export default BooksList;