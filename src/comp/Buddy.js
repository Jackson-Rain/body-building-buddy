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
            exercises: {},//work:1000}, //todo: set to empty again
            choice: 'nothing',
            lastPrompt: null,
            mute: true,
            autoLog: true,
            log: [], // list of completed exercises and reps
            settings: {
                interval: 15 * 60,
                minPercent: 65,
                maxPercent: 100,
                bell: true,
                speak: true,
            },
            canSpeak: false // todo: test in Buddy constructor to see if browser is capable of speech
        };

        this.pass = this.pass.bind(this);
        this.log = this.log.bind(this);
        this.newExercise = this.newExercise.bind(this);

        this.bell = new Audio('res/audio/ding3.mp3');
    }

    render() {
        console.log('buddyrender');
        if (Object.keys(this.state.exercises).length === 0)
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
                        <Exercises buddy={this}/>
                    </div>
                );
            case 'settings':
                return (
                    <div>
                        <Navbar buddy={this}/>
                        <Settings buddy={this}/>
                    </div>
                );
            default:
                return (
                    <div>Invalid path: {this.state.path}</div>
                );
        }
    }

    pass() {
        this.setState({choice: 'nothing'});
    }

    log() {
        if (this.state.choice === 'nothing' || (this.state.log.length > 0 &&
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
        let percentRange = this.state.settings.maxPercent - this.state.settings.minPercent;
        let reps = Math.round((this.state.settings.minPercent + percentRange * Math.random()) / 100 * this.state.exercises[choice]);
        this.setState({
            choice: choice,
            reps: reps,
            lastPrompt: new Date()
        });

        this.resetClock(); // a function assigned by Clock component

        if (!this.state.mute) {
            if (this.state.settings.bell) this.bell.play();        
            // todo: speak prompt
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
}

export default Buddy;