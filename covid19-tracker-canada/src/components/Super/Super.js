import {Component} from 'react';
import Navigation from '../Navigation/Navigation';
import './super.css';



class Super extends Component {


    render() {
        return (
            <div className="mainContainer containerFluid d-flex align-items-center justify-content-center flex-column flex-xl-row">
            <Navigation/>
            <h2 className="border h-25">sup</h2>
            </div>
        );
    }

}

export default Super;