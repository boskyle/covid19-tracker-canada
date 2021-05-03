import {Component} from 'react';

class ProvinceLeaderboard  extends Component {

    constructor(props) {
        super(props);

        this.state = {
            realLeaderboard : [],
            updatedLeaderboard : []
        }

    }


    


    static getDerivedStateFromProps(props,state) {
        return {realLeaderboard : props.leaderboard.sort((a,b) => b.cases - a.cases)};
    }

    
    componentDidUpdate(prevProps,prevState) {
        
    }
 

    render() {
    console.log(this.state.realLeaderboard);     
        return (
            <h2 style={{position: 'absolute',top:'0.5em'}}>Highest to Lowest Cases</h2>
        );
    }
}


export default ProvinceLeaderboard;