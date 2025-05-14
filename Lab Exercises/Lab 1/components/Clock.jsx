import { states, use, useEffect } from 'react';

// Renders a digital time that updates every second.
function Clock() {
    const [date, setDate] = useState(new Date());

    useEffect(() => { // first arg is usually an arrow function
        setInterval(() => renderToStaticMarkup(), 1000); // setInterval is a built-in function that runs every 1000ms (1s)
        console.log('Clock component mounted');
    }, []); // second arg is an array of dependencies. If empty, the effect runs once after the initial render.

    const tick = () => {
        setDate(new Date()); // update the date state with the current date and time
        console.log('tick'); // log to the console every time the tick function is called
    };

    return (
        <div className="Clock">
            <h1>Digital Clock</h1>
            <p>{date.toLocaleTimeString()}</p> {/* format the date as a time string */}
        </div>
    );
    }

// ++ Try removing the dependency array from useEffect
// and notice the difference in ‘tick’ log messages
// ++ Why do the console messages appear double?

function Clockdisplay() {

    const toggleClock = () => {
        setShowClock(!showClock); // toggle the showClock state
    }

    return (

         <div className="ClockDisplay componentBox">
{showClock && <Clock />}
<button onClick={toggleClock}>Toggle Clock</button>
</div>
    )
}

export default ClockDisplay;

// ++ Add both components into Clock.jsx and render
// <ClockDisplay /> from App.jsx
// ++ Watch the console when the Clock is removed -
// does the ticking still continue?

useEffect(() => {
    let clockInterval = setInterval(() => tick(), 1000); // setInterval to call tick every second
    console.log('Clock component mounted');

    // function returned from useEffect is run on unmount
    // and used to cleanup any side effects

    return () => {
        console.log('Clock component unmounted');
        clearInterval(clockInterval); // clear the interval to stop the clock
    }
}
, []); // empty array ensures this effect runs only once on mount

// ++ Watch the console when the Clock is removed -
// does the ticking still continue now?
// ++ Try to add another state variable tickCount, to keep
// track of (and display) the number of seconds the clock
// has ticked since mounting. Reset it to 0 on unmount.

import { useState, useEffect } from 'react';

function ActivityFinder() { //Fetches a random activity from an API
    
    const [participants, setParticipants] = useState(1); // number of participants
    const [activity, setActivity] = useState(''); // activity data from API}

    useEffect(() => {
        fetch('https://www.boredapi.com/api/activity?' + 'participants=' + participants) // fetch activity based on participants
            .then(response => response.json()) // parse the response as JSON
            .then(json => {
                setActivity(json.activity); // set the activity state with the data from API
            });
    }, [participants]);   // effect runs when participants state changes

    return (
        <div className="ActivityFinder componentBox">
            <h3> Activity Finder</h3>
            <label>choose Number of Participants: 
                <select value= {participants}
                onChange={(e) => setParticipants(e.target.value)}> // update participants state on change
                
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select>
                </label>
                <div><strong>Suggested Activity</strong>{activity}
                </div>
                </div>
                )
                }

// ++ Reference https://www.boredapi.com/documentation and add a
// new dropdown to suggest an activity based on type
// updated useEffect hook from previous slide

useEffect(() => {
    console.log('running effect');
    let ignore = false; // flag to ignore the effect if unmounted

    fetch('https://www.boredapi.com/api/activity?' + 'participants=' + participants) // fetch activity based on participants
        .then(response => response.json()) // parse the response as JSON
        .then(json => {
            if (!ignore) { // check if the component is still mounted
                setActivity(json.activity); // set the activity state with the data from API
            }
        });
        
        // cleanup function - run when the component is unmounted or dependencies change
        return () => {
            console.log('cleanup effect');
            ignore = true; // set the flag to ignore the effect
        };
    }, [participants]);   // effect runs when participants state changes

    // ++ Watch/edit the console log messages when using this component to
// understand when the effect and its cleanup run
