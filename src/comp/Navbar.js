import React from 'react';

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <input type="button" value="Buddy" onClick={()=>{this.props.buddy.setState({path:'buddy'});}}></input>
                <input type="button" value="Exercises" onClick={()=>{this.props.buddy.setState({path:'exercises'});}}></input>
                <input type="button" value="Settings" onClick={()=>{this.props.buddy.setState({path:'settings'});}}></input>
            </div>
        );
    }

    componentDidMount() {
        
    }
}

export default Navbar;