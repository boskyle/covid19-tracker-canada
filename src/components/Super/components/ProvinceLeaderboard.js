import {Component} from 'react';
import './provinceLeaderboard.css';

class ProvinceLeaderboard  extends Component {

    constructor(props) {
        super(props);

        this.state = {
            updatedLeaderboard : [],
            listItems: <li>Empty</li>
        }

    }


    


    static getDerivedStateFromProps(props,state) {
        return {updatedLeaderboard : props.leaderboard};
    }

    componentDidMount() {
        console.log("ProvinceLeaderboard mounted..");
        console.log(this.props.leaderboard);
    }

    
    componentDidUpdate(prevProps,prevState) {
        
      

    }
 

    render() {  
        console.table(this.state.updatedLeaderboard);
        return (
            <>
                <h4 sty>Leaderboard</h4>
                {this.state.updatedLeaderboard.map((data,index) => (
                    <div className="province-item card m-1">
                        <p className="m-0">{index+1}. {data.name}</p>
                <small className="m-0"><strong>{this.props.board.option_one} cases:  {data.cases_sum}</strong></small>
                    </div>
                ))}
            </>
        );
    }
}


export default ProvinceLeaderboard;