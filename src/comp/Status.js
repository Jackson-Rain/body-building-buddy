import React from 'react';

import Clock from './Clock';

class Status extends React.Component {
    render() {
        let prompt = (<div>Do nothing</div>);
        if (this.props.buddy.state.choice !== 'nothing')
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
                <h1>Body Building Buddy</h1>
                <div><h2>{prompt}</h2></div>
                <div>
                    <Clock buddy={this.props.buddy}/>
                    <div>
                        <input type="checkbox" id="chkMute" checked={this.props.buddy.state.mute} onChange={()=>{
                            let chk = document.getElementById('chkMute');
                            this.props.buddy.setState({
                                mute: chk.checked
                            });
                        }}></input>
                        Mute
                    </div>
                    <p></p>
                </div>
                <div>
                    { this.props.buddy.state.autoLog && // oh so that's how you do it
                    <div className="BigButton" onClick={this.props.buddy.pass}>Pass</div> }
                    { !this.props.buddy.state.autoLog &&
                    <div className="BigButton" onClick={this.props.buddy.log}>Done</div> }
                    <div className="BigButton" onClick={this.props.buddy.newExercise}>Fast Forward</div>
                </div>
                <div>
                    <input type="checkbox" id="chkAutoLog" checked={this.props.buddy.state.autoLog} onChange={()=>{
                        let chk = document.getElementById('chkAutoLog');
                        this.props.buddy.setState({
                            autoLog: chk.checked
                        });
                    }}></input>
                    Automatically log exercise
                </div>
                <div><h3>History:</h3></div>
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
}

export default Status;