import React from 'react';

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.settingsToCookie = this.settingsToCookie.bind(this);
    }
    render() {
        return (
            <div>
                <div className="BigButton" onClick={()=>{
                    if (this.props.buddy.state.path === 'settings')
                        this.settingsToCookie();
                    this.props.buddy.setState({path:'buddy'});
                }}>Buddy</div>
                <div className="BigButton" onClick={()=>{
                    if (this.props.buddy.state.path === 'settings')
                        this.settingsToCookie();
                    this.props.buddy.setState({path:'exercises'});
                }}>Exercises</div>
                <div className="BigButton" onClick={()=>{
                    this.props.buddy.setState({path:'settings'});
                }}>Settings</div>
            </div>
        );
    }

    settingsToCookie() {
        let cookie = 'bodybuildingbuddy_se=';
        let settings = this.props.buddy.state.settings;
        cookie += 'interval:' + settings.interval;
        cookie += '|minPercent:' + settings.minPercent;
        cookie += '|maxPercent:' + settings.maxPercent;
        cookie += '|bell:' + settings.bell;
        cookie += '|speak:' + settings.speak;
        document.cookie = cookie + '; expires=' + new Date(new Date().getTime() + 1000*3600*24*365*2).toUTCString();
    }
}

export default Navbar;