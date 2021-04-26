import {Component} from 'react';
import './super.css';
import Province from './classes/Province';
import {FormControl,FormLabel,FormGroup,FormControlLabel,RadioGroup,Radio,NativeSelect} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider,DatePicker} from "@material-ui/pickers";
import ProvinceInformation from './classes/ProvinceInformation';

class Super extends Component {
   

    constructor(props) {
        super(props);
        this.state = {
            board:  {    option_one: 'daily',
                         province:'alberta',
                         date:new Date()
                },
            information: {
                data: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleProvinceChange = this.handleProvinceChange.bind(this);

    }
    
    handleChange = e => {
        let board = {...this.state.board};
        board.option_one = e.target.value;
        this.setState({board});
    }
    handleProvinceChange = e => {
        // const name = e.target.name;     
        let board = {...this.state.board};
        board.province =  e.target.value;
        this.setState({board});
    }

    componentDidMount() {
        console.log('Super mounted.');
        // let foo = new Province();
        // foo.findData(this.state.board.province,this.state.board.date);
        let foo2 = new ProvinceInformation();
        foo2.getData(this.state.board.province,this.state.board.date).then((data) => {
            let info = {...this.state.information};
            info.data = data;
            this.setState({info});
            console.log(this.state);
        });
    }

    componentWillUnmount() {
        console.log('Super unmounted.');
    }

    componentDidUpdate(prevProps,prevState) { 
        console.log('Super updated.');
        // let foo = new Province();
        // foo.findData(this.state.board.province,prevState.board.province,this.state.board.date);
        let foo2 = new ProvinceInformation();
        foo2.getData(this.state.board.province,this.state.board.date).then((data) => {
            console.log(data);
        });
   
    }

    render() {
        
        console.log(this.state.information);
        return (
            <div className="mainContainer containerFluid">
            {/* <Navigation/> */}
                <div className="row no-gutters h-100" style={{overflow: 'auto'}}>

                    <div className="col-md-2 p-2 d-flex flex-column align-items-center justify-content-center first-column">
                        <div className="dashboard  w-100 h-75 card" style={{backgroundColor:'#6C8AD7'}}>
                        <h2 className="mt-5 text-center">BOARD</h2>


                        <FormControl component="fieldset">
                            <FormGroup className="mt-5 p-1">
                            <FormLabel component="legend">Province/Territory</FormLabel>
                                <NativeSelect
                                value={this.state.board.province}
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
                                value={this.state.board.date}
                                onChange={(newVal) => {
                                    let board = {...this.state.board};
                                    board.date = newVal;
                                    this.setState({board});
                                }}/>
                              </MuiPickersUtilsProvider>
                         
                  
                            </FormGroup>



                        </FormControl>
                     
                        
                   
                       
                        </div>
                    </div>
                    <div className="col-md-10 p-2 d-flex flex-column align-items-center justify-content-center second-column">
                      
                        {/* <h2 className="bg-info card p-1 text-center">CANADA COVID19 TRACKER</h2> */}
                        <div className="mapContainer d-flex flex-column align-items-center card mb-2 h-75" style={{backgroundColor:'#6C8AD7'}}>
                      
                        {/* MAP */}      
                        </div>
                  
                        
                    </div>

                    {/* <div className="col-xl-2 p-2 d-flex flex-column align-items-center justify-content-start">
                   
                   
                        <div className="leaderboard h-100 w-100 d-flex flex-column align-items-center" style={{backgroundColor:'#6C8AD7'}}><h2>leaderboard highest to lowest</h2></div>
                       
                    </div>                                  */}
                </div>
            </div>
        );
    }

}

export default Super;
