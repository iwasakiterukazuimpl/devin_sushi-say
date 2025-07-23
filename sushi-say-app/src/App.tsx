import { useState } from 'react'
import styles from './App.module.css'
import SendingScreen from './SendingScreen'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [currentScreen, setCurrentScreen] = useState<'top' | 'sending' | 'complete'>('top')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSendClick = async () => {
    console.log('Send clicked:', inputValue)
    setCurrentScreen('sending')
    
    try {
      const response = await fetch('http://localhost:3001/say', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputValue }),
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log('API response:', data)
        setTimeout(() => {
          setCurrentScreen('complete')
        }, 2000)
      } else {
        const errorData = await response.json()
        console.error('API error:', errorData)
        alert(`エラー: ${errorData.error}`)
        setCurrentScreen('top')
      }
    } catch (error) {
      console.error('Network error:', error)
      alert('ネットワークエラーが発生しました')
      setCurrentScreen('top')
    }
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
            <h1 className={styles.completionTitle}>送信されました！</h1>
            <h2 className={styles.submittedContent}>{inputValue}</h2>
          </div>
          
          <button 
            className={styles.topButton}
            onClick={() => setCurrentScreen('top')}
          >
            TOP
          </button>
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
