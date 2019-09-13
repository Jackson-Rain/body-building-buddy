import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props);

        this.state = { seconds: 3 };

        this.props.buddy.resetClock = ()=>{
            this.setState({
                seconds: this.props.buddy.state.settings.interval
            });
        }
    }

    render() {
        return (
            <div>
                {new Date(this.state.seconds * 1000).toISOString().substr(11, 8)}
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