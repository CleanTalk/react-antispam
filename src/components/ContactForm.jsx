import { useState } from 'react'

const DEFAULT_STATE = { name: '', email: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Name is required'
  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Email is invalid'
  if (!values.message.trim()) errors.message = 'Message is required'
  return errors
}

export default function ContactForm({ onSubmitEndpoint }) {
  const [values, setValues] = useState(DEFAULT_STATE)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setValues(v => ({ ...v, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setStatus('submitting')
    setServerMessage('')

    try {
      if (onSubmitEndpoint) {
        const res = await fetch(onSubmitEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        })
        if (!res.ok) throw new Error('Failed to submit form')
        setServerMessage('Thanks! Your message has been sent.')
      } else {
        await new Promise(r => setTimeout(r, 600))
        setServerMessage('Thanks! Your message has been recorded locally.')
      }
      setValues(DEFAULT_STATE)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setServerMessage(err.message || 'Something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card form">
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={values.name} onChange={handleChange} placeholder="Your name" />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" value={values.email} onChange={handleChange} placeholder="you@example.com" />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" value={values.message} onChange={handleChange} placeholder="How can we help?" />
        {errors.message && <div className="error">{errors.message}</div>}
      </div>

      <button type="submit" className="btn" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>

      {status !== 'idle' && serverMessage && (
        <div className={status === 'error' ? 'note error' : 'note success'}>{serverMessage}</div>
      )}
    </form>
  )
}


