import React from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import {combineReducers, createStore} from 'redux';
import Navbar from './Common/Navbar';
import BooksList from './Components/BooksList';
import {BookReducer} from './Store/Reducers/BookReducer';
import {Provider} from 'react-redux';
import Ecart from './Components/Ecart';
import Checkout from './Components/Checkout';

function App(){
    const rootReducer = combineReducers({bookReducer:BookReducer});
    const store = createStore(rootReducer);
    return(
        <React.Fragment>
            <Provider store={store}>
            <BrowserRouter>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={BooksList}/>
                    <Route path="/cart" component={Ecart}/>
                    <Route path="/checkout" component={Checkout}/>
                </Switch>
            </BrowserRouter>
            </Provider>
        </React.Fragment>
    );
}
export default App;