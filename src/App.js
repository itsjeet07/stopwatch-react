import './App.css';
import React, { useState, useEffect, useRef } from "react";

import './App.css';
import React, { useState, useEffect, useRef } from "react";

const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
}

function App() {
  const [secondsRemaining, setSecondsRemaining] = useState(0)
  const [status, setStatus] = useState(STATUS.STOPPED)

  const secondsToDisplay = secondsRemaining % 60
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
  const minutesToDisplay = minutesRemaining % 60

  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  const setminHandle = (e) => {
    setMin(e.target.value)
  }

  const setSecHandle = (e) => {
    setSec(e.target.value)
  }

  useEffect(() => {
    setStatus(STATUS.STARTED)
  }, [status])


  const handleStart = () => {
    const minSec = (+min * 60) + +sec ;
    setSecondsRemaining(minSec);

  }
  const handleStop = () => {
    setStatus(STATUS.STOPPED)
  }
  const handleReset = () => {
    setStatus(STATUS.STOPPED)
    setSecondsRemaining(0)
    setMin(0)
    setSec(0)
  }

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1)
      } else {
        setStatus(STATUS.STOPPED)
      }
    },
    status === STATUS.STARTED ? 1000 : null
  )

  const twoDigits = (num) => String(num).padStart(2, '0')

  return (
    <div>
      <label >
        <input type='number' value={min} onChange={setminHandle} />
        Minutes
      </label>
      <label >
        <input type='number' value={sec} onChange={setSecHandle} />
        Seconds
      </label>

      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Pause/resume</button>
      <button onClick={handleReset}>Stop</button>

      <h1>{twoDigits(minutesToDisplay)}:
        {twoDigits(secondsToDisplay)}</h1>
    </div>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default App;
