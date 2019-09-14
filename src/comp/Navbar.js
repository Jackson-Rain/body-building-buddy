import React from 'react';

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.settingsToCookie = this.settingsToCookie.bind(this);
    }
    render() {
        return (
            <div>
                <input type="button" value="Buddy" onClick={()=>{
                    if (this.props.buddy.state.path === 'settings')
                        this.settingsToCookie();
                    this.props.buddy.setState({path:'buddy'});
                }}></input>
                <input type="button" value="Exercises" onClick={()=>{
                    if (this.props.buddy.state.path === 'settings')
                        this.settingsToCookie();
                    this.props.buddy.setState({path:'exercises'});
                }}></input>
                <input type="button" value="Settings" onClick={()=>{this.props.buddy.setState({path:'settings'});}}></input>
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