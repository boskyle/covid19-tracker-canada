import {Component} from 'react';

class ProvinceView extends Component {

constructor(props) {
    super(props);
}
    displayData = ({covidInfo,provInfo}) => {
       console.log("province: "+provInfo.name+"\n"+"latitude: "+provInfo.latitude+"\n"+"longitude: "+provInfo.longitude +"\n");
    }
}

export default ProvinceView;