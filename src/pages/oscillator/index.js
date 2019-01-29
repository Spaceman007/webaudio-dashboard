
import { Select, Button, Icon } from 'antd'
import styles from './index.scss'
import Cell from '@components/cell'

const Option = Select.Option

class Oscillator extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      oscType: 'square',
      started: false,
      frequency: '432'
    }
  }

  handleOscChange (val) {
    this.stop()
    this.setState({ oscType: val })
    setTimeout(() => {
      if (this.state.started) {
        this.play()
      }
    }, 0)
  }

  handleFreqChange (val) {
    this.setState({ frequency: val })
    if (this.oscillators && this.oscillators[this.state.oscType]) {
      this.oscillators[this.state.oscType].frequency.value = val
    }
  }

  init () {
    this.audioCtx = new AudioContext()
    this.gainNode = this.audioCtx.createGain()
    this.gainNode.connect(this.audioCtx.destination)
    this.gainNode.gain.value = 0.3 // as the sound is not so pleasant, we reduce the volume
    this.oscillators = {}
  }

  play () {
    if (!this.audioCtx) {
      this.init()
    }
    if (!this.oscillators[this.state.oscType]) {
      this.oscillators[this.state.oscType] = this.audioCtx.createOscillator()
      this.oscillators[this.state.oscType].type = this.state.oscType
      this.oscillators[this.state.oscType].frequency.value = this.state.frequency
      this.oscillators[this.state.oscType].onended = function (e) {
        console.log(e)
      }
      this.oscillators[this.state.oscType].start()
      console.log(this.state.oscType)
    }

    this.oscillators[this.state.oscType].frequency.value = this.state.frequency
    this.oscillators[this.state.oscType].connect(this.gainNode)
  }

  stop () {
    if (this.oscillators && this.oscillators[this.state.oscType]) {
      this.oscillators[this.state.oscType].disconnect()
    }
  }

  componentWillUnmount () {
    this.stop()
  }

  togglePlay () {
    const status = !this.state.started
    this.setState({ started: status })
    if (status) {
      this.play()
    } else {
      this.stop()
    }
  }

  handleClick () {
    this.togglePlay()
  }

  render () {
    return (
      <div className={styles.content}>
        <span>Choose the oscillator type: </span>
        <Select defaultValue={this.state.oscType} style={{width:120}} onChange={this.handleOscChange.bind(this)}>
          <Option value='square'>Square</Option>
          <Option value='sine'>Sine</Option>
          <Option value='sawtooth'>Sawtooth</Option>
          <Option value='triangle'>Triangle</Option>
        </Select>
        &emsp;

        <span>Choose the initial frequency: </span>
        <Select defaultValue={this.state.frequency} style={{width:120}} onChange={this.handleFreqChange.bind(this)}>
          <Option value='20'>20</Option>
          <Option value='80'>80</Option>
          <Option value='100'>100</Option>
          <Option value='432'>432</Option>
          <Option value='440'>440</Option>
        </Select>
        &emsp;

        <Button type='primary' onClick={this.handleClick.bind(this)}>{this.state.started ? 'Stop' : 'Play'}</Button>

        <div>
          <Cell><Icon type="fire" /> oscillator make sound for you</Cell>
        </div>

      </div>
    )
  }
}

export default Oscillator
