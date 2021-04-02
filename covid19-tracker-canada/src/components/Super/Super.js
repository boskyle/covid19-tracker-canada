import {Component} from 'react';
import Navigation from '../Navigation/Navigation';
import moment from 'moment';
import './super.css';



class Super extends Component {

    constructor(props) {
        super(props);
        this.state = { data : []};
   
    }

    // called twice 1=> server 2=> client 
    // 1. after initial render when client receive data from server.
    // 2. before data is displayed in the browser.

    // componentWillMount() {
    //     console.log('Super mounted.');
    //     fetch()
    // }
    componentDidMount() {
        console.log('Super mounted.');
        let date = new Date();
        date.setDate(date.getDate() -1);

        let fDate = moment(date).format('YYYY-MM-DD');
        console.log(fDate);
        fetch(`https://api.opencovid.ca/timeseries?stat=cases&loc=ON&date=${fDate}`)
            .then(response => response.json())
                .then(data => {
                    console.log(data.cases[0]);
                    console.log(data.cases[0].cases);
                    const {cases,cum_cases:cumulative_cases,province} = data.cases[0];
                    console.log(cases);
           
                });
    }

    componentWillUnmount() {
        console.log('Super unmounted.');
    }

    componentDidUpdate() {
    
    }

    render() {
        console.log(this.state.data);
        return (
            <div className="mainContainer containerFluid">
            {/* <Navigation/> */}
                <div className="row no-gutters h-100">

                    <div className="col-sm-3 border d-flex flex-column align-items-center justify-content-start">
                        <h2 className="mt-5">Dashboard</h2>
                    </div>
                    <div className="col-sm-6 border d-flex flex-column align-items-center justify-content-center">
                      
                        <h2 className="bg-info card p-1 text-center">CANADA COVID19 TRACKER</h2>
                        <div className="mapContainer d-flex flex-column align-items-center card" style={{marginBottom:'10%',backgroundColor:'#6C8AD7'}}>
                        
                            
                        </div>
                    </div>

                    <div className="col-sm-3 border d-flex flex-column align-items-center justify-content-start">
                   
                        <h2 className="mt-5">Leaderboards</h2>
                       
                    </div>
                  

                    
                </div>
            </div>
        );
    }

}

export default Super;