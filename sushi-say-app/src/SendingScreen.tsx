import { useEffect } from 'react'
import styles from './SendingScreen.module.css'

interface SendingScreenProps {
  onComplete: () => void
}

function SendingScreen({ onComplete }: SendingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.sendingText}>
          送信中・・・
        </div>
      </div>
      
      <footer className={styles.footer}>
        ©impl・Business engineer team
      </footer>
    </div>
  )
}

export default SendingScreen
