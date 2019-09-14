import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props);

        let secondsLeft = 3;
        if (this.props.buddy.state.lastPrompt !== null) {
            let sinceLast = (new Date() - this.props.buddy.state.lastPrompt) / 1000;
            secondsLeft = this.props.buddy.state.settings.interval - sinceLast;
        }

        this.state = { seconds: secondsLeft };

        this.props.buddy.resetClock = ()=>{
            this.setState({
                seconds: this.props.buddy.state.settings.interval
            });
        }
    }

    render() {
        return (
            <div>
                <h2 style={{marginBottom:0}}>
                    {new Date(this.state.seconds * 1000).toISOString().substr(11, 8)}
                </h2>
            </div>
        );
    }

    componentDidMount() {
        this.interval = setInterval(()=>{
            let nextSec = this.state.seconds - 1;
            if (nextSec === 0) {
                this.setState({
                    seconds: this.props.buddy.state.settings.interval
                });
                this.props.buddy.newExercise();
            }
            
            this.setState({
                seconds: this.state.seconds - 1
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

export default Clock;