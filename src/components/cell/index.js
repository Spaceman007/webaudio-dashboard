import styles from './index.scss'

export default function (props) {
  return (
    <div className={styles.cell}>
      {props.children}
    </div>
  )
}
