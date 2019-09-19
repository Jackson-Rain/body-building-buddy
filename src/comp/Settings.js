import React from 'react';

class Settings extends React.Component {
    render() {
        return (
            <div>
                <h1>Settings</h1>
                <table className="padded">
                    <tbody>
                        <tr>
                            <td>Time between exercises (minutes)</td>
                            <td><input type="number" id="numInterval" value={this.props.buddy.state.settings.interval/60} onChange={()=>{
                                let shallowCopy = Object.assign({}, this.props.buddy.state.settings);
                                shallowCopy.interval = Number(document.getElementById('numInterval').value*60);
                                this.props.buddy.setState({ settings: shallowCopy });
                            }}></input></td>
                        </tr>
                        <tr>
                            <td>Minimum set amount (percent of max)</td>
                            <td><input type="number" id="minPercent" value={this.props.buddy.state.settings.minPercent} onChange={()=>{
                                let shallowCopy = Object.assign({}, this.props.buddy.state.settings);
                                shallowCopy.minPercent = Number(document.getElementById('minPercent').value);
                                this.props.buddy.setState({ settings: shallowCopy });
                            }}></input></td>
                        </tr>
                        <tr>
                            <td>Maximum set amount (percent of max)</td>
                            <td><input type="number" id="maxPercent" value={this.props.buddy.state.settings.maxPercent} onChange={()=>{
                                let shallowCopy = Object.assign({}, this.props.buddy.state.settings);
                                shallowCopy.maxPercent = Number(document.getElementById('maxPercent').value);
                                this.props.buddy.setState({ settings: shallowCopy });
                            }}></input></td>
                        </tr>
                        <tr>
                            <td>Alarm bell</td>
                            <td><input type="checkbox" id="chkBell" checked={this.props.buddy.state.settings.bell} onChange={()=>{
                                let chk = document.getElementById('chkBell');
                                let shallowCopy = Object.assign({}, this.props.buddy.state.settings);
                                shallowCopy.bell = chk.checked;
                                this.props.buddy.setState({
                                    settings: shallowCopy
                                });
                            }}></input></td>
                        </tr>
                        {this.props.buddy.state.canSpeak && (
                        <tr>
                            <td>Robot voice<br /></td>
                            <td><input type="checkbox" id="chkSpeak" checked={this.props.buddy.state.settings.speak} onChange={()=>{
                                let chk = document.getElementById('chkSpeak');
                                let shallowCopy = Object.assign({}, this.props.buddy.state.settings);
                                shallowCopy.speak = chk.checked;
                                this.props.buddy.setState({
                                    settings: shallowCopy
                                });
                            }}></input></td>
                        </tr>)}
                    </tbody>
                </table>
                <p><div className="BigButton" onClick={()=>{
                            this.props.buddy.setState({
                                settings: this.props.buddy.defaultSettings()
                            });
                        }}>Set to defaults</div></p>
            </div>
        );
    }
}

export default Settings;