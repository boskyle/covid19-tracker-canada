import {Component} from 'react';
import Navigation from '../Navigation/Navigation';
import './super.css';



class Super extends Component {


    render() {
        return (
            <div className="containerFluid mainContainer">
            <Navigation/>
            <h2>sup</h2>
            </div>
        );
    }

}

export default Super;