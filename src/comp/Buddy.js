import React from 'react';

import Start from './Start';
import Navbar from './Navbar';
import Status from './Status';
import Exercises from './Exercises';
import Settings from './Settings';

import './Buddy.css';

class Buddy extends React.Component {
    constructor(props) {
        super(props);
        
        // defaults
        this.defaultSettings = ()=>{
            return {
                interval: 15 * 60,
                minPercent: 65,
                maxPercent: 100,
                bell: true,
                speak: true,
            };
        };

        let exercises = {};
        let settings = this.defaultSettings();

        console.log(document.cookie);
        let cookies = document.cookie.split('; ');
        cookies.forEach((cookie)=>{
            if (cookie.startsWith('bodybuildingbuddy_ex=')) {
                let pairs = cookie.substring(21).split('|');
                    pairs.forEach((pair)=>{
                        let fields = pair.split('#');
                        exercises[fields[0].replace('_', ' ')] = Number(fields[1]);
                    });
            } else if (cookie.startsWith('bodybuildingbuddy_se=')) {
                settings = {};
                let pairs = cookie.substring(21).split('|');
                settings.interval = Number(pairs[0].split(':')[1]);
                settings.minPercent = Number(pairs[1].split(':')[1]);
                settings.maxPercent = Number(pairs[2].split(':')[1]);
                settings.bell = pairs[3].endsWith('true');
                settings.speak = pairs[4].endsWith('true');
            }
        });

        this.state = {
            path: 'buddy', // used like a url
            exercises: exercises,
            choice: 'nothing',
            lastPrompt: null,
            mute: false,
            autoLog: true,
            log: [], // list of completed exercises and reps
            settings: settings,
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
        
        let inner;
        switch (this.state.path) {
            case 'buddy':
                inner = (
                    <Status buddy={this}/>
                ); break;
            case 'exercises':
                inner = (
                    <Exercises buddy={this}/>
                ); break;
            case 'settings':
                inner = (
                    <Settings buddy={this}/>
                ); break;
            default:
                inner = (
                    <div>Invalid path: {this.state.path}</div>
                ); break;
        }

        return (
            <div className="BodyBuildingBuddy">
                <Navbar buddy={this}/>
                {inner}
            </div>
        )
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
        console.log(this.state.settings);

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