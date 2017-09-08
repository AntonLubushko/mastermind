/**
 * This component just a listing of computer user conversation */
import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
const styles = theme => ({
    attempt: {
        marginRight: 206,
    },
    cm: {
        marginRight: 44
    },
    intend: {
        marginTop: 10
    },
});
class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <h2>
                    {'For number ' + this.props.mindNumber}
                </h2>
                <Grid>
                    {this.props.steps.map((elem, i, arr) =>
                        <div key={elem.guessNumber}>
                            <Grid className={classes.attempt}>
                                {'Attempt ' + (i + 1)}
                            </Grid>
                            <Grid >
                                {'Codebreaker: maybe it is number ' + (elem.guessNumber)}
                            </Grid>
                            <Grid className={classes.cm}>
                                {'Codemaker: my answer is ' + (elem.code[0] + 'B' + elem.code[1] + 'W')                               }
                            </Grid>
                            <Grid>
                                {((i === arr.length - 1 && i < 10 ) ? 'You are the winner!!!' : '')}
                                {(i >= 10) ? 'To much attempts, you lost, computer is winner' : ''}
                            </Grid>
                            <Grid className={classes.intend}>
                                {''}
                            </Grid>
                        </div>
                    )}
                </Grid>
            </div>
        )
    }
}
List.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(List);