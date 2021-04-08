import {Component,Fragment} from 'react';
import moment from 'moment';
import './super.css';
import Province from './classes/Province';
import ProvinceInformation from './classes/ProvinceInformation';

import {FormControl,FormLabel,FormGroup,FormControlLabel,RadioGroup,Radio,NativeSelect} from '@material-ui/core';
import {Slider,Typography} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider,DatePicker, KeyboardDatePicker } from "@material-ui/pickers";





// View
class Super extends Component {
   

    constructor(props) {
        super(props);
        this.state = { data : {},option_one: 'daily',province:'alberta',date:new Date()};
        this.handleChange = this.handleChange.bind(this);
        this.handleProvinceChange = this.handleProvinceChange.bind(this);

    }
    
    handleChange = e => {
        this.setState({option_one: e.target.value});
    }
    handleProvinceChange = e => {
        const name = e.target.name;     
        this.setState({...this.state,[name]: e.target.value})
    }


    // called twice 1=> server 2=> client 
    // 1. after initial render when client receive data from server.
    // 2. before data is displayed in the browser.

    // componentWillMount() {
    //     console.log('Super mounted.');
    //     fetch()
    // }
    

    // MVC => Controller
    componentDidMount() {
        console.log('Super mounted.');
        // let date = new Date();
        // date.setDate(date.getDate() -1);
        // let fDate = moment(date).format('YYYY-MM-DD');
        // MVC => MODEL
        let foo = new ProvinceInformation(this.state.province,moment(this.state.date).format('DD-MM-YYYY'));
        foo.getData();
     

    }

    componentWillUnmount() {
        console.log('Super unmounted.');
    }

        // MVC => Controller
    componentDidUpdate() { 
        console.log(moment(this.state.date).format('YYYY-MM-DD'));
        let foo = new ProvinceInformation(this.state.province,moment(this.state.date).format('DD-MM-YYYY'));

        foo.getData().then((data) =>
        {
            console.log(data.cases);
        });

      
    }

    // View
    render() {
        
        return (
            <div className="mainContainer containerFluid">
            {/* <Navigation/> */}
                <div className="row no-gutters h-100" style={{overflow: 'auto'}}>

                    <div className="col-xl-2 p-2 d-flex flex-column align-items-center justify-content-start">
                        <div className="dashboard  w-100 h-100 card" style={{backgroundColor:'#6C8AD7'}}>
                        <h2 className="mt-5 text-center">BOARD</h2>


                        <FormControl component="fieldset">
                            <FormGroup className="mt-5 p-1">
                            <FormLabel component="legend">Province/Territory</FormLabel>
                                <NativeSelect
                                value={this.state.province}
                                onChange={this.handleProvinceChange}        
                                inputProps={{name: 'province'}}
                                >
                                <option value="alberta">Alberta</option>
                                <option value="british-columbia">British Columbia</option>
                                <option value="manitoba">Manitoba</option>
                                <option value="new-brunswick">New Brunswick</option>
                                <option value="new-foundland-and-labrador">Newfoundland and Labrador</option>
                                <option value="northwest-territories">Northwest Territories</option>
                                <option value="nova-scotia">Nova Scotia</option>
                                <option value="nunavut">Nunavut</option>
                                <option value="ontario">Ontario</option>
                                <option value="pei">Prince Edward Island</option>
                                <option value="quebec">Quebec</option>
                                <option value="saskatchewan">Saskatchewan</option>
                                <option value="yukon">Yukon</option>
                                </NativeSelect>
                            </FormGroup>
                          
                            <FormGroup className="mt-5 p-1">
                                <FormLabel component="legend">Option</FormLabel>
                                    <RadioGroup value={this.state.option_one} onChange={this.handleChange} className="w-100 d-flex flex-row justify-content-center">
                                        <FormControlLabel  value="daily" control={<Radio color="primary" />} label="Daily" />
                                        <FormControlLabel  value="weekly" control={<Radio color="primary" />} label="Weekly" />
                                        <FormControlLabel  value="monthly" control={<Radio color="primary" />} label="Monthly" />
                                    </RadioGroup>
                            </FormGroup>


                            <FormGroup className="p-1">

                                {/* <Typography id="discrete-slider" gutterBottom>
                                Month 
                                </Typography>
                                <Slider
                                    className="mx-auto w-75"
                                    defaultValue={1}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={1}
                                    min={1}
                                    max={12}
                                /> */}
                              
                              <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                variant="inline"
                                label="Date"
                                value={this.state.date}
                                onChange={(newVal) => this.setState({date: newVal})}/>
                              </MuiPickersUtilsProvider>
                         
                  
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
                           
                            </div>
                        
                    </div>

                    <div className="col-xl-2 p-2 d-flex flex-column align-items-center justify-content-start">
                   
                        {/* <div className="leaderboard h-25 w-100 mb-2" style={{backgroundColor:'#6C8AD7'}}>Leaderboard Title</div> */}
                        <div className="leaderboard h-100 w-100 d-flex flex-column align-items-center" style={{backgroundColor:'#6C8AD7'}}><h2>leaderboard highest to lowest</h2></div>
                       
                    </div>
                  

                    
                </div>
            </div>
        );
    }

}

export default Super;