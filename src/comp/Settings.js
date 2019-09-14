import React from 'react';

class Settings extends React.Component {
    render() {
        let chkBell = (this.props.buddy.state.settings.bell) ?
            (<input type="checkbox" id="chkBell" defaultChecked></input>) :
            (<input type="checkbox" id="chkBell"></input>) ;
        
        let chkSpeak = (this.props.buddy.state.settings.speak) ?
            (<input type="checkbox" id="chkAlarm" defaultChecked></input>) :
            (<input type="checkbox" id="chkAlarm"></input>) ;

        return (
            <div>
                <h1>Settings</h1>
                <table className="padded">
                    <tbody>
                        <tr>
                            <td>Time between exercises (minutes)</td>
                            <td><input type="number" id="numInterval" defaultValue={this.props.buddy.state.settings.interval/60} onChange={()=>{
                                let shallowCopy = Object.assign({}, this.props.buddy.state.settings);
                                shallowCopy.interval = Number(document.getElementById('numInterval').value*60);
                                this.props.buddy.setState({ settings: shallowCopy });
                            }}></input></td>
                        </tr>
                        <tr>
                            <td>Minimum set amount (percent of max)</td>
                            <td><input type="number" id="minPercent" defaultValue={this.props.buddy.state.settings.minPercent} onChange={()=>{
                                let shallowCopy = Object.assign({}, this.props.buddy.state.settings);
                                shallowCopy.minPercent = Number(document.getElementById('minPercent').value*60);
                                this.props.buddy.setState({ settings: shallowCopy });
                            }}></input></td>
                        </tr>
                        <tr>
                            <td>Maximum set amount (percent of max)</td>
                            <td><input type="number" id="maxPercent" defaultValue={this.props.buddy.state.settings.maxPercent} onChange={()=>{
                                let shallowCopy = Object.assign({}, this.props.buddy.state.settings);
                                shallowCopy.maxPercent = Number(document.getElementById('maxPercent').value*60);
                                this.props.buddy.setState({ settings: shallowCopy });
                            }}></input></td>
                        </tr>
                        <tr>
                            <td>Alarm bell</td>
                            <td>{chkBell}</td>
                        </tr>
                        {this.props.buddy.state.canSpeak && (
                        <tr>
                            <td>Robot voice<br /></td>
                            <td>{chkSpeak}</td>
                        </tr>)}
                        
                    </tbody>
                </table>
            </div>
        );
    }

    toggleBell() {
        let chk = document.getElementById('chkBell');
        if (chk == null) return;
        let shallowCopy = Object.assign({}, this.props.buddy.state.settings);
        shallowCopy.bell = chk.checked;
        this.props.buddy.setState({
            settings: shallowCopy
        });
    }

    toggleSpeak() {
        let chk = document.getElementById('chkSpeak');
        let shallowCopy = Object.assign({}, this.props.buddy.state.settings);
        shallowCopy.speak = chk.checked;
        this.props.buddy.setState({
            settings: shallowCopy
        });
    }
}

export default Settings;