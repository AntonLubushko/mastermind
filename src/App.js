import React, {Component} from 'react';
import {startGuessing} from './actions/actions';
import './App.css';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import List from './List';
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mindNumber: '',
            inputValue: '',
            steps: [],
        };
    }

    handleChangeInput = (event) => {
        let number = event.target.value;
        this.setState({inputValue: number});
    };

    showSteps = () => {
        if (/^[1-6]{4}$/.test(this.state.inputValue)) {
            this.setState({mindNumber:this.state.inputValue});
            this.setState({steps: startGuessing(this.state.inputValue)});
            this.setState({inputValue:''});
        }
    };

    render() {
        const classes = this.props.classes;
        console.log(this.state);
        return (
            <div className="App">
                <div className="App-header">
                    <h2>MASTERMIND</h2>
                    <h4>Please input 4-digit number with digits from 1 to 6 and click the button</h4>
                </div>
                <div>
                    <input onChange={this.handleChangeInput} value={this.state.inputValue}/>
                    <Button raised color="primary" className={classes.button} onClick={this.showSteps}>
                        Start guessing!
                    </Button>
                </div>
                {this.state.steps.length !== 0 ?
                    <List steps={this.state.steps} mindNumber={this.state.mindNumber}/> :
                    'Input a number and click the button'}
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
