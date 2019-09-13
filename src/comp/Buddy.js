import React from 'react';

import Start from './Start';
import Navbar from './Navbar';
import Status from './Status';
import Exercises from './Exercises';
import Settings from './Settings';

class Buddy extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            path: 'buddy', // used like a url
            started: false,
            exercises: {},
            seconds: 3,
            choice: 'nothing',
            lastPrompt: new Date(),
            autoLog: true,
            log: [], // list of completed exercises and reps
            settings: {
                interval: 15 * 60,
            }
        };

        this.pass = this.pass.bind(this);
        this.log = this.log.bind(this);
        this.newExercise = this.newExercise.bind(this);
    }

    render() {
        if (!this.state.started)
            return (<Start buddy={this}/>);
        
        switch (this.state.path) {
            case 'buddy':
                return (
                    <div>
                        <Navbar buddy={this}/>
                        <Status buddy={this}/>
                    </div>
                );
            case 'exercises':
                return (
                    <div>
                        <Navbar buddy={this}/>
                        <Exercises/>
                    </div>
                );
            case 'settings':
                return (
                    <div>
                        <Navbar buddy={this}/>
                        <Settings />
                    </div>
                );
            default:
                return (
                    <div>Invalid path: {this.state.path}</div>
                );
        }
    }

    componentDidMount() {
        this.interval = setInterval(()=>{
            if (!this.state.started) return;
            let nextSec = this.state.seconds - 1;
            if (nextSec === 0) {
                this.setState({
                    seconds: this.state.settings.interval
                });
                this.newExercise();
            }
            
            this.setState({
                seconds: this.state.seconds - 1
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    pass() {
        this.setState({choice: 'nothing'});
    }

    log() {
        if (this.choice === 'nothing' || (this.state.log.length > 0 &&
            this.state.lastPrompt === this.state.log[this.state.log.length-1].time)) {
            return;
        }

        let record = {
            exercise: this.state.choice,
            amount: this.state.reps,
            time: this.state.lastPrompt
        };
        this.setState({
            log: this.state.log.concat(record)
        });
    }

    newExercise() {
        if (this.state.autoLog) this.log();
        let keys = Object.keys(this.state.exercises);
        let choice = keys[Math.floor(Math.random() * keys.length)];
        let reps = Math.round((0.6 + 0.4 * Math.random()) * this.state.exercises[choice]);
        this.setState({
            choice: choice,
            reps: reps,
            seconds: this.state.settings.interval,
            lastPrompt: new Date()
        });
    }
}

export default Buddy;