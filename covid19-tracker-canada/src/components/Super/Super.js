import {Component} from 'react';
import moment from 'moment';
import './super.css';

import {FormControl,FormLabel,FormGroup,FormControlLabel,Checkbox,RadioGroup,Radio} from '@material-ui/core';




class Super extends Component {

    constructor(props) {
        super(props);
        this.state = { data : [],option_one: 'daily'};
        this.handleChange = this.handleChange.bind(this);

    }
    
    handleChange = e => {
        this.setState({option_one: e.target.value});
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
                    // destructure json from the api
                    const {cases,cum_cases:cumulative_cases,province} = data.cases[0];
                    console.log(cases);        
                });
    }

    componentWillUnmount() {
        console.log('Super unmounted.');
    }

    componentDidUpdate() {
        console.log(this.state.option_one);
    }

    render() {
        
        return (
            <div className="mainContainer containerFluid">
            {/* <Navigation/> */}
                <div className="row no-gutters h-100" style={{overflow: 'auto'}}>

                    <div className="col-xl-2 p-2 d-flex flex-column align-items-center justify-content-start">
                        <div className="dashboard  w-100 h-100 card" style={{backgroundColor:'#6C8AD7'}}>
                        <h2 className="mt-5 text-center">DASHBOARD</h2>


                        <FormControl component="fieldset">
                          
                            <FormGroup className="mt-5 p-1">
                                <FormLabel component="legend">Option</FormLabel>
                                    <RadioGroup value={this.state.option_one} onChange={this.handleChange} className="w-100 d-flex flex-row justify-content-center">
                                        <FormControlLabel  value="daily" control={<Radio color="primary" />} label="Daily" />
                                        <FormControlLabel  value="weekly" control={<Radio color="primary" />} label="Weekly" />
                                        <FormControlLabel  value="monthly" control={<Radio color="primary" />} label="Monthly" />
                                    </RadioGroup>
                            </FormGroup>

                        </FormControl>
                     
                        
                   
                       
                        </div>
                    </div>
                    <div className="col-xl-8 p-2 d-flex flex-column align-items-center justify-content-start">
                      
                        {/* <h2 className="bg-info card p-1 text-center">CANADA COVID19 TRACKER</h2> */}
                        <div className="mapContainer d-flex flex-column align-items-center card mb-2" style={{backgroundColor:'#6C8AD7'}}>
                        {/* MAP */}      
                        </div>
                        <div className="infoContainer w-100 h-25 card d-flex flex-column" style={{backgroundColor:'#6C8AD7'}}>
                            <p>Lorem Ipsum lorem ipsum dolor sit ametDeserunt eu quis et voluptate labore fugiat aute id 
                              
                            </p>
                            </div>
                        
                    </div>

                    <div className="col-xl-2 p-2 d-flex flex-column align-items-center justify-content-start">
                   
                        <div className="leaderboard h-25 w-100 mb-2" style={{backgroundColor:'#6C8AD7'}}>Leaderboard Title</div>
                        <div className="leaderboard h-75 w-100 " style={{backgroundColor:'#6C8AD7'}}>Leaderboard</div>
                       
                    </div>
                  

                    
                </div>
            </div>
        );
    }

}

export default Super;