import React from 'react';

let STARTER_EXERCISES = {
    'Pushups': 20,
    'Leg Lifts': 10,
    'Plank': 60,
    'Side Plank': 60,
    'Pullups': 5,
    'Chinups': 6,
    'Burpees': 8,
    'Jumping Jacks': 60,
    'Squats': 20,
    'Jumps': 8,
    'Lunges': 12,
    'Lunge Jumps': 7,
};

class Start extends React.Component {
    
    // constructor(props) {
    //     super(props);
    // }

    render() {
        let rows = [];
        let keys = Object.keys(STARTER_EXERCISES);
        for (let i=0; i<keys.length; i++)
            rows.push((
                <tr key={i}>
                    <td><input type="checkbox" id={"chk"+i} defaultChecked></input></td>
                    <td>{keys[i]}</td>
                </tr>
            ));

        return (            
            <div>
                <h1>Welcome!</h1>
                <div>Select some starter exercises, you can add more in the settings tab later.</div>
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <input type="button" value="Start" onClick={this.begin.bind(this)}></input>
            </div>
        );
    }

    componentDidMount() {
        //this.begin()
    }

    begin() {
        let selected = {};
        let keys = Object.keys(STARTER_EXERCISES);
        for (let i=0; i<keys.length; i++) {
            let chk = document.getElementById('chk'+i);
            if (chk.checked) {
                selected[keys[i]] = STARTER_EXERCISES[keys[i]];
            }
        } console.log(selected);
        this.props.buddy.setState({
            started: true,
            exercises: selected,
        });
    }
}

export default Start;