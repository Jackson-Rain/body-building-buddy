import React from 'react';

class Exercises extends React.Component {
    render() {
        let keys = Object.keys(this.props.buddy.state.exercises);
        let exercises = [];
        for (let i=0; i<keys.length; i++) {
            let exercise = this.props.buddy.state.exercises[keys[i]];
            let row = (
                <tr key={'key'+i}>
                    <td>{keys[i]}</td>
                    <td>{exercise.amount}</td>
                    <td><input type="button" value="Delete" onClick={()=>{
                            // delete this exercise from buddy.state 
                            let shallowCopy = Object.assign({}, this.props.buddy.state.exercises);
                            delete shallowCopy[keys[i]];
                            this.props.buddy.setState({
                                exercises: shallowCopy
                            });
                        }}></input></td>
                </tr>
            );
            exercises.push(row);
        }

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Exercise</td>
                            <td>Amount</td>
                            <td></td>
                        </tr>
                        {exercises}
                        <tr>
                            <td></td>
                            <td></td>
                            <td><input type="button" value="Add"></input></td>
                        </tr>
                    </thead>
                </table>
            </div>
        );
    }
}

export default Exercises;