import styles from './index.scss'
import { Button, message, Icon } from 'antd'
import Cell from '@components/cell'

class Mp3 extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      started: false
    }
  }

  loadMusic (url) {
    fetch(url)
      .then((response) => {
        message.success(`load ${url} success！`)
        return response.arrayBuffer()
      })
      .then(buffer => {
        this.audioCtx.decodeAudioData(buffer, decodedData => {
          this.audioBuf = decodedData
          this.playSound(this.audioBuf)
        })
      })
      .catch((err) => {
        console.log(err)
        message.error(`fetch ${url} failed!`)
      })
  }

  playSound (buffer) {
    this.source = this.audioCtx.createBufferSource()
    this.source.buffer = buffer
    this.source.connect(this.audioCtx.destination)
    this.source.start(0, 10) // startTime, offsetTime, second as unit
  }

  componentWillUnmount () {
    if (this.source) {
      this.source.stop()
    }
  }

  handleClick () {
    if (this.state.started) {
      this.source.stop()
    } else {
      if (!this.audioCtx) {
        this.audioCtx = new AudioContext()
      }
      if (this.audioBuf) {
        this.playSound(this.audioBuf)
      } else {
        this.loadMusic('/music/music.mp3')
      }
    }
    this.setState({ started: !this.state.started })
  }

  render () {
    return (
      <div className={styles.content}>
        <Button type={this.state.started ? 'danger' : 'primary'} onClick={this.handleClick.bind(this)}>
          {
            this.state.started
              ? "Stop"
              : "Load and Play"
          }
        </Button>
        <span> You will hear the sound when you click the buttton</span>

        <div>
          <Cell><Icon type="fire" /> use fetchApi to get mp3 file</Cell>
          <Cell><Icon type="fire" /> call response.arrayBuffer() to get arrayBuffer</Cell>
          <Cell><Icon type="fire" /> call decodeAudioData to get the audio buffer</Cell>
          <Cell><Icon type="fire" /> source.start(start, offset)</Cell>
          <Cell><Icon type="fire" /> source.stop()</Cell>
        </div>
      </div>
    )
  }
}

export default Mp3
