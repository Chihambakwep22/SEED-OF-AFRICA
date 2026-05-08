import { useState, useRef, useEffect } from 'react'
import '../styles/Chatbot.css'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi! 👋 Welcome to Thale-Quants. I can help answer quick questions about our Enterprise solutions, Entrepreneur programs, or anything else. How can we help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  const [sessionId] = useState(() => Date.now().toString())
  const [hasUnread, setHasUnread] = useState(true)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setHasUnread(false)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')

    // Send to backend
    try {
      const response = await fetch('/api/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          session_id: sessionId,
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        const data = await response.json()
        const botMessage = {
          id: messages.length + 2,
          text: data.response || 'Thank you for your message. Our team will get back to you shortly.',
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, botMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        id: messages.length + 2,
        text: 'Sorry, there was an error. Please try again later.',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  return (
    <div className="chatbot-container">
      <button
        className={`chatbot-toggle ${hasUnread && !isOpen ? 'has-unread' : ''}`}
        onClick={handleToggle}
        aria-label="Open chat"
      >
        {hasUnread && !isOpen && <span className="unread-badge"></span>}
        <span className="chatbot-toggle-icon" aria-hidden="true">
          {isOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          )}
        </span>
        <span className="chatbot-toggle-label">Chat</span>
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Thale-Quants Support</h3>
            <p>We're here to help</p>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message message-${message.sender}`}
              >
                <div className="message-content">
                  {message.text}
                </div>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="chatbot-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="chatbot-input"
            />
            <button type="submit" className="chatbot-send">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
