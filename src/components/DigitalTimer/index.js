// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timer: '25:00', mins: 25, isPaused: true}

  onPlus = () => {
    const {mins, isPaused} = this.state
    if (isPaused) {
      this.setState({
        mins: mins + 1,
        timer: `${mins + 1}:00`,
      })
    }
  }

  onMinus = () => {
    const {isPaused} = this.state
    if (isPaused) {
      this.setState(prevState => ({
        mins: prevState.mins - 1,
        timer: `${prevState.mins - 1}:00`,
      }))
    }
  }

  onPlay = () => {
    this.timerId = setInterval(this.tick, 1000)
  }

  onPause = () => {
    clearInterval(this.timerId)
    this.setState({isPaused: true})
  }

  onReset = () => {
    const {mins} = this.state
    clearInterval(this.timerId)
    this.setState(() => ({isPaused: true, timer: `${mins}:00`}))
  }

  tick = () => {
    const {timer} = this.state
    let [mins, secs] = timer.split(':')
    if (parseInt(secs) === 0) {
      secs = 60
      mins = parseInt(mins) - 1
    }
    if (parseInt(secs) <= 10) {
      this.setState({timer: `${mins}:0${parseInt(secs) - 1}`, isPaused: false})
    } else {
      this.setState({
        timer: `${mins}:${parseInt(secs) - 1}`,
        isPaused: false,
      })
    }
  }

  render() {
    const {mins, isPaused, timer} = this.state
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="timer-and-buttons">
          <div className="timer-container">
            <div className="timer-pause-run">
              <h1 className="timer">{timer}</h1>
              <p className="timer-text">{isPaused ? 'Paused' : 'Running'}</p>
            </div>
          </div>
          <div className="buttons-to-setTime">
            <div className="buttons">
              <button
                onClick={!isPaused ? this.onPause : this.onPlay}
                className="pause-play-btns"
                type="button"
              >
                {!isPaused ? (
                  <>
                    <img
                      className="pause-play-imgs"
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      alt="pause icon"
                    />
                  </>
                ) : (
                  <>
                    <img
                      className="pause-play-imgs"
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      alt="play icon"
                    />
                  </>
                )}
                {!isPaused ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={this.onReset}
                className="pause-play-btns"
                type="button"
              >
                <img
                  className="pause-play-imgs"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                Reset
              </button>
            </div>
            <p className="set-timer-text">Set Timer limit</p>
            <div className="timer-add-minus-btns">
              <button
                onClick={this.onMinus}
                className="pause-play-btns"
                type="button"
              >
                -
              </button>
              <p className="mins-container" type="button">
                {mins}
              </p>
              <button
                onClick={this.onPlus}
                className="pause-play-btns"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
