import { useState } from 'react'
import styles from './App.module.css'
import SendingScreen from './SendingScreen'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [currentScreen, setCurrentScreen] = useState<'top' | 'sending' | 'complete'>('top')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSendClick = () => {
    console.log('Send clicked:', inputValue)
    setCurrentScreen('sending')
  }

  const handleSendingComplete = () => {
    setCurrentScreen('complete')
  }

  if (currentScreen === 'sending') {
    return <SendingScreen onComplete={handleSendingComplete} />
  }

  if (currentScreen === 'complete') {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.titleSection}>
            <h1 className={styles.mainTitle}>送信完了！</h1>
          </div>
        </div>
        
        <footer className={styles.footer}>
          ©impl - Business engineer team
        </footer>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titleSection}>
          <p className={styles.subtitle}>ひとことネタアプリ</p>
          <h1 className={styles.mainTitle}>Sushi Say</h1>
        </div>
        
        <div className={styles.inputSection}>
          <input
            type="text"
            className={styles.textInput}
            placeholder="まぐろ"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button 
            className={styles.sendButton}
            onClick={handleSendClick}
          >
            送信
          </button>
        </div>
      </div>
      
      <footer className={styles.footer}>
        ©impl - Business engineer team
      </footer>
    </div>
  )
}

export default App
