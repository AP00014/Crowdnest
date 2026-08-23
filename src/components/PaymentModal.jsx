import { useEffect, useState } from 'react'
import '../styles/payment-modal.css'

export default function PaymentModal({ open, project, currency, onClose }) {
  const [amount, setAmount] = useState('25')
  const [method, setMethod] = useState('card')

  useEffect(() => {
    if (open) {
      document.body.classList.add('payment-mock-open')
      setAmount('25')
      setMethod('card')
    } else {
      document.body.classList.remove('payment-mock-open')
    }
    return () => document.body.classList.remove('payment-mock-open')
  }, [open])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  function handleConfirm() {
    window.alert(`Demo only: ${method} — ${project} — amount ${amount}`)
    onClose()
  }

  return (
    <div className="payment-mock-modal">
      <div className="payment-mock-modal__backdrop" tabIndex={-1} onClick={onClose} />
      <div
        className="payment-mock-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-mock-heading"
      >
        <button type="button" className="payment-mock-modal__x" aria-label="Close dialog" onClick={onClose}>
          <i className="ri-close-line" aria-hidden="true" />
        </button>
        <h2 id="payment-mock-heading" className="payment-mock-modal__title">Volunteer checkout</h2>
        <p className="payment-mock-modal__project">{project}</p>

        <fieldset className="payment-mock-modal__methods">
          <legend>Payment method</legend>
          {[
            { value: 'card', label: 'Card' },
            { value: 'paypal', label: 'PayPal' },
            { value: 'apple', label: 'Apple Pay' },
            { value: 'bank', label: 'Bank transfer' },
          ].map((opt) => (
            <label key={opt.value} className="payment-mock-modal__method">
              <input
                type="radio"
                name="payment-mock-method"
                value={opt.value}
                checked={method === opt.value}
                onChange={() => setMethod(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </fieldset>

        <label className="payment-mock-modal__field">
          <span className="payment-mock-modal__amount-label">Volunteer amount ({currency})</span>
          <input
            type="number"
            className="payment-mock-modal__input"
            min={1}
            step={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <p className="payment-mock-modal__hint">Front-end mockup only — no payment is processed.</p>

        <div className="payment-mock-modal__actions">
          <button type="button" className="payment-mock-modal__confirm" onClick={handleConfirm}>
            Confirm (demo)
          </button>
          <button type="button" className="payment-mock-modal__close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
