import {Component} from 'react';

class ProvinceLeaderboard  extends Component {

    constructor(props) {
        super(props);

        this.state = {
            updatedLeaderboard : []
        }

    }


    


    static getDerivedStateFromProps(props,state) {
        return {updatedLeaderboard : props.leaderboard};
    }

    componentDidMount() {
    }

    
    componentDidUpdate(prevProps,prevState) {
        // slice b.c console.log doesnt update when new data is given..
        console.log(this.props.board.option_one);
        console.log(this.props.leaderboard);
       
    }
 

    render() {  
        return (
            <h2 style={{position: 'absolute',top:'0.5em'}}>Highest to Lowest Cases</h2>
        );
    }
}


export default ProvinceLeaderboard;