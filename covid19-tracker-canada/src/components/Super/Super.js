import {Component} from 'react';
import './super.css';
import Province from './classes/Province';
import {FormControl,FormLabel,FormGroup,FormControlLabel,RadioGroup,Radio,NativeSelect} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider,DatePicker} from "@material-ui/pickers";
import ProvinceInformation from './classes/ProvinceInformation';
import moment from 'moment';
class Super extends Component {
   

    constructor(props) {
        super(props);
        this.state = {
            board:  {    option_one: 'daily',
                         province:'alberta',
                         date:this.goToYesterday(new Date())
                },
            information: {
                covidInfo : {
                    cases: 'not avaiable yet...',
                    cumulative_cases: 'not avaiable yet...',
                    date_report: 'not avaiable yet...',
                    province: 'not avaiable yet...'
                },
            provInfo: ''   ,
            retDate: '',
            leaderboard: []
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

    goToYesterday = (today) => {

        let yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday;
    }

    componentDidMount() {
        console.log('Super mounted.');

        // have a onMount date format for render visual 
        
        let foo2 = new ProvinceInformation();
        foo2.getData(this.state.board.province,this.state.board.date,this.state.board.option_one).then((data) => {
            let {covidInfo,provInfo,myDate} = data;
                let information = {...this.state.information};

                if (covidInfo.cases[0] !== undefined) {
                    information.covidInfo = covidInfo.cases[0];
                    console.log(covidInfo.cases[0]);
                }
                information.provInfo = provInfo;
                information.retDate = myDate;
                this.setState({information});

                // get initial date format
                
          
        });
    }

    componentWillUnmount() {
        console.log('Super unmounted.');
    }

    componentDidUpdate(prevProps,prevState) { 
        console.log('Super updated.');
        let foo2 = new ProvinceInformation();
        foo2.getData(this.state.board.province,this.state.board.date,this.state.board.option_one).then((data) => {
            // if prev state board not the same as current
            // => no changes are occuring unless there is!
            if(!Object.is(prevState.board,this.state.board)) {
                let {covidInfo,provInfo,myDate} = data;
                let information = {...this.state.information};
                
                if (covidInfo.cases[0] !== undefined) {
                    information.covidInfo = covidInfo.cases[0];
                    /*map through array of cases if weekly / monthly then sum it up*/
                    if (this.state.board.option_one === "weekly" || this.state.board.option_one === "monthly") {
                        let sum = 0;
                        covidInfo.cases.map(obj => {
                            sum += obj.cases;
                        })
                        information.covidInfo.cases = sum;
                        console.log(sum);
                    }
                } else {
                    information.covidInfo.cases = 
                    information.covidInfo.cumulative_cases = 
                    information.covidInfo.date_report =
                    information.covidInfo.province = "not avaiable yet...";
                }
                information.provInfo = provInfo;
                information.retDate = myDate;
                this.setState({information});         
            }
        });

        foo2.getLeaderboard(this.state.board.date,this.state.board.option_one).then(x => {

            if(!Object.is(prevState.board,this.state.board)) {
                /*
                x is an array of responses to be fetched..
                pipe the response to be json object so I can extract data..
                */          
           
               x.map(response => {
                   let sum = 0;
                   let tempArray = [];
                   
                  
                    response.json()
                    .then(dataArray => {
                        console.log(dataArray.cases);
                        dataArray.cases.map((data,index) => {
                           
                            sum += data.cases;
                        })
                        console.log("sum of the above: "+ sum);
                
                    });
                })
                
            }
        });


    }

    render() {
        

        return (
            <div className="mainContainer containerFluid">
            {/* <Navigation/> */}
                <div className="row no-gutters h-100" style={{overflow: 'auto'}}>

                    <div className="col-0  col-xl-3 d-flex flex-column align-items-center justify-content-center first-column p-5">
                        <div className="dashboard  w-100 h-75 card" style={{backgroundColor:'#6C8AD7'}}>
                        <h2 className="mt-5 text-center">BOARD</h2>


                        <FormControl component="fieldset">
                            <FormGroup className="mt-5">
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
                                    <RadioGroup defaultValue="daily" value={this.state.option_one} onChange={this.handleChange} className="w-100 d-flex flex-row justify-content-center">
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
                                    board.date = moment(newVal).format('YYYY-MM-DD');
                                    this.setState({board});
                                }}/>
                              </MuiPickersUtilsProvider>
                         
                  
                            </FormGroup>



                        </FormControl>
                     
                        
                   
                       
                        </div>
                    </div>
                    <div className="col-12 col-xl-9  d-flex flex-column align-items-center justify-content-center second-column">
                      
                        {/* <h2 className="bg-info card p-1 text-center">CANADA COVID19 TRACKER</h2> */}
                        <div className="mapContainer d-flex flex-column align-items-center card mb-2 h-75" style={{backgroundColor:'#6C8AD7'}}>

                            <div className="row no-gutters h-100 w-100 p-3">
                                <div className="col-md-3 d-flex flex-column align-items-center">
                                    <div className="h-100 w-100 card leaderboardWrapper text-center">
                                        
                                    </div>
                                </div>
                                <div className="col-md-9 p-3 d-flex flex-column  align-items-center justify-content-center">

                                    <div className="p-5 text-center card covidWrapper">
                                    <h1 className="display">{this.state.information.provInfo.name}</h1>
                                    <h2>{this.state.information.retDate}</h2>
                                    <h2>{this.state.board.option_one} cases:  {this.state.information.covidInfo.cases}</h2>
                                    </div>
                                </div>

                            </div>

                        
                            
                      
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
