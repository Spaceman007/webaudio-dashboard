import styles from './index.scss'
import { Button, message } from 'antd'

class LocalAudio extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      started: false
    }
  }

  handleStream (stream) {
    // Wrap a MediaStreamSourceNode around the live stream.
    this.microphone = this.audioCtx.createMediaStreamSource(stream)
    this.microphone.connect(this.audioCtx.destination)
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
    this.gainNode = this.audioCtx.createGain()
    this.gainNode.gain.value = 0.02
    this.source.connect(this.gainNode)
    this.gainNode.connect(this.audioCtx.destination)
    this.source.start()
  }
  getLocalAudio () {
    navigator.getUserMedia({ audio: true }, stream => {
      this.handleStream(stream)
    }, err => {
      console.log(err)
    })
  }
  handleClick () {
    if (!this.audioCtx) {
      this.audioCtx = new AudioContext()
    }
    if (this.state.started) {
      this.stop()
    } else {
      this.getLocalAudio()
      if (!this.audioBuf) {
        this.loadMusic('/music/music.mp3')
      }
    }
    this.setState({ started: !this.state.started })
  }

  stop () {
    if (this.source) {
      this.source.stop()
    }
    if (this.microphone) {
      this.microphone.disconnect()
    }
  }

  componentWillUnmount () {
    this.stop()
  }

  render () {
    return (
      <div className={styles.content}>
        <h2>use web audio api to play audio stream from local microphone</h2>
        <h2>also play some music as the background at the same time</h2>
        <audio src="/music/music.mp3" ref={node => this.audio = node}></audio>
        <Button type='primary' onClick={this.handleClick.bind(this)}>
          {this.state.started ? 'Stop' : 'Start' }
        </Button>
      </div>
    )
  }
}

export default LocalAudio
