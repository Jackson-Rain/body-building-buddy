import React from 'react';

import Clock from './Clock';

class Status extends React.Component {
    constructor(props) {
        super(props);

        this.toggleAutoLog = this.toggleAutoLog.bind(this);
    }

    render() {
        let prompt = (<div>Do nothing</div>);
        if (this.props.buddy.state.choice != 'nothing')
            prompt = ( <div>Do {this.props.buddy.state.reps} {this.props.buddy.state.choice}</div> );
    
        let log = [];
        for (let i=0; i<this.props.buddy.state.log.length; i++) {
            let line = (
            <tr key={'key'+i}>
                <td>{this.props.buddy.state.log[i].exercise}</td>
                <td>{this.props.buddy.state.log[i].amount}</td>
                <td>{this.props.buddy.state.log[i].time.toLocaleTimeString()}</td>
            </tr>);
            log.push(line);
        }

        return (
            <div>
                <div>{prompt}</div>
                <div><Clock buddy={this.props.buddy}/></div>
                <div>
                    <input type="button" value="Pass" onClick={this.props.buddy.pass}></input>
                    { !this.props.buddy.state.autoLog && // oh so that's how you do it
                    <input type="button" value="Done" onClick={this.props.buddy.log}></input> }
                    <input type="button" value="Fast Forward" onClick={this.props.buddy.newExercise}></input>
                </div>
                <div>
                    <input type="checkbox" id="chkAutoLog" value="Log all exercise" defaultChecked></input>
                    Automatically log exercise
                </div>
                <div>History:</div>
                <table>
                    <thead>
                        <tr>
                            <td>Exercise</td>
                            <td>Amount</td>
                            <td>Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {log}
                    </tbody>
                </table>
            </div>
        );
    }

    componentDidMount() {
        let chk = document.getElementById('chkAutoLog');
        chk.checked = this.props.buddy.state.autoLog;
        chk.addEventListener('change', this.toggleAutoLog);
    }

    componentWillUnmount() {
        let chk = document.getElementById('chkAutoLog');
        chk.removeEventListener('change', this.toggleAutoLog);
    }

    toggleAutoLog() {
        let chk = document.getElementById('chkAutoLog');
        if (chk == null) return;
        this.props.buddy.setState({
            autoLog: document.getElementById('chkAutoLog').checked
        });
    };
}

export default Status;