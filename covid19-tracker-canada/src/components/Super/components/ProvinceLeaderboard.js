import {Component} from 'react';

class ProvinceLeaderboard  extends Component {

    constructor(props) {
        super(props);

    }



    componentDidMount() {
        console.log('ProvinceLeaderboard component mounted...');
    }
    componentDidUpdate(prevProps,prevState) {
        console.log('ProvinceLeaderboard component updated...');

        if (!Object.is(prevProps.board,this.props.board)) {
            console.log(this.props.leaderboard.sort((a,b) => b.cases - a.cases));
        }
    }
 

    render() {
        return (
            <h2 style={{position: 'absolute',top:'0.5em'}}>Highest to Lowest Cases</h2>
        );
    }
}


export default ProvinceLeaderboard;