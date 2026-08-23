import { useEffect, useState } from 'react'
import { createPledge } from '../api/client'
import { useAuth } from '../context/AuthContext'
import '../styles/payment-modal.css'

const NAME_REGEX = /^[A-Za-z][A-Za-z' -]{1,29}$/
const METHODS = [
  { value: 'card', label: 'Card', icon: 'ri-bank-card-line' },
  { value: 'paypal', label: 'PayPal', icon: 'ri-paypal-line' },
  { value: 'apple', label: 'Apple Pay', icon: 'ri-apple-line' },
  { value: 'bank', label: 'Bank transfer', icon: 'ri-bank-line' },
]

function digitsOnly(value) {
  return value.replace(/\D/g, '')
}

function formatCardNumber(value) {
  return digitsOnly(value).slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(value) {
  const digits = digitsOnly(value).slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

function isFutureExpiry(value) {
  const match = value.match(/^(0[1-9]|1[0-2])\/(\d{2})$/)
  if (!match) return false
  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  const expires = new Date(year, month)
  return expires > new Date()
}

export default function PaymentModal({ open, project, currency, onClose }) {
  const { user, updateUser } = useAuth()
  const [nameConfirmed, setNameConfirmed] = useState(false)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [amount, setAmount] = useState('25')
  const [method, setMethod] = useState('card')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [receipt, setReceipt] = useState(null)

  useEffect(() => {
    if (!open) {
      document.body.classList.remove('payment-mock-open')
      return undefined
    }

    document.body.classList.add('payment-mock-open')
    setFirstname(user?.firstname ?? '')
    setLastname(user?.lastname ?? '')
    setAmount('25')
    setMethod('card')
    setCardNumber('')
    setExpiry('')
    setCvc('')
    setError('')
    setBusy(false)
    setReceipt(null)
    setNameConfirmed(!user)

    return () => document.body.classList.remove('payment-mock-open')
  }, [open, user?.id])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape' && open && !busy) onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose, busy])

  if (!open) return null

  function validateName() {
    if (!firstname.trim() || !lastname.trim()) {
      setError('Enter your first and last name')
      return false
    }
    if (!NAME_REGEX.test(firstname.trim()) || !NAME_REGEX.test(lastname.trim())) {
      setError('Names can only contain letters, spaces, hyphens, or apostrophes')
      return false
    }
    return true
  }

  function continueToPayment(e) {
    e.preventDefault()
    if (!validateName()) return
    setError('')
    setNameConfirmed(true)
  }

  async function handleConfirm(e) {
    e.preventDefault()
    setError('')

    if (!validateName()) return

    const value = Number(amount)
    if (!Number.isFinite(value) || value < 1) {
      setError('Enter an amount of at least 1')
      return
    }

    if (method === 'card') {
      const number = digitsOnly(cardNumber)
      if (number.length < 13 || number.length > 16) {
        setError('Enter a 13–16 digit demo card number')
        return
      }
      if (!isFutureExpiry(expiry)) {
        setError('Enter a valid future expiry date')
        return
      }
      if (!/^\d{3,4}$/.test(cvc)) {
        setError('Enter a 3 or 4 digit CVC')
        return
      }
    }

    setBusy(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 700))
      const data = await createPledge({
        project,
        amount: value,
        currency,
        method,
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        cardLast4: method === 'card' ? digitsOnly(cardNumber).slice(-4) : undefined,
      })
      if (data.user) updateUser(data.user)
      setReceipt(data.pledge)
    } catch (err) {
      setError(err.message || 'Demo payment failed')
    } finally {
      setBusy(false)
    }
  }

  const step = receipt ? 'done' : user && !nameConfirmed ? 'name' : 'pay'
  const heading = step === 'name'
    ? 'Confirm your name'
    : step === 'done'
      ? 'Payment received'
      : 'Demo checkout'

  return (
    <div className="payment-mock-modal">
      <div className="payment-mock-modal__backdrop" tabIndex={-1} onClick={busy ? undefined : onClose} />
      <div
        className="payment-mock-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-mock-heading"
      >
        <button
          type="button"
          className="payment-mock-modal__x"
          aria-label="Close dialog"
          onClick={onClose}
          disabled={busy}
        >
          <i className="ri-close-line" aria-hidden="true" />
        </button>
        <h2 id="payment-mock-heading" className="payment-mock-modal__title">{heading}</h2>
        <p className="payment-mock-modal__project">{project}</p>

        {step !== 'done' && (
          <p className={`payment-mock-modal__guest${user ? ' payment-mock-modal__guest--signed' : ''}`}>
            {user
              ? 'Signed in — enter your full name before paying.'
              : 'No account needed. You can fund as a guest.'}
          </p>
        )}

        {step === 'name' && (
          <form className="payment-mock-modal__form" onSubmit={continueToPayment}>
            <p className="payment-mock-modal__hint">
              We need your legal first and last name before we open checkout.
            </p>
            <div className="payment-mock-modal__row">
              <label className="payment-mock-modal__field">
                <span className="payment-mock-modal__amount-label">First name</span>
                <input
                  className="payment-mock-modal__input"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  autoComplete="given-name"
                  required
                />
              </label>
              <label className="payment-mock-modal__field">
                <span className="payment-mock-modal__amount-label">Last name</span>
                <input
                  className="payment-mock-modal__input"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  autoComplete="family-name"
                  required
                />
              </label>
            </div>
            {error && <p className="payment-mock-modal__error">{error}</p>}
            <div className="payment-mock-modal__actions">
              <button type="submit" className="payment-mock-modal__confirm">
                Continue to payment
              </button>
              <button type="button" className="payment-mock-modal__close" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {step === 'pay' && (
          <form className="payment-mock-modal__form" onSubmit={handleConfirm}>
            {!user && (
              <div className="payment-mock-modal__row">
                <label className="payment-mock-modal__field">
                  <span className="payment-mock-modal__amount-label">First name</span>
                  <input
                    className="payment-mock-modal__input"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    autoComplete="given-name"
                    required
                  />
                </label>
                <label className="payment-mock-modal__field">
                  <span className="payment-mock-modal__amount-label">Last name</span>
                  <input
                    className="payment-mock-modal__input"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    autoComplete="family-name"
                    required
                  />
                </label>
              </div>
            )}

            <fieldset className="payment-mock-modal__methods">
              <legend>Payment method</legend>
              {METHODS.map((opt) => (
                <label key={opt.value} className="payment-mock-modal__method">
                  <input
                    type="radio"
                    name="payment-mock-method"
                    value={opt.value}
                    checked={method === opt.value}
                    onChange={() => setMethod(opt.value)}
                  />
                  <i className={opt.icon} aria-hidden="true" />
                  {opt.label}
                </label>
              ))}
            </fieldset>

            <label className="payment-mock-modal__field">
              <span className="payment-mock-modal__amount-label">Amount ({currency})</span>
              <input
                type="number"
                className="payment-mock-modal__input"
                min={1}
                step={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </label>

            {method === 'card' && (
              <div className="payment-mock-modal__card">
                <label className="payment-mock-modal__field">
                  <span className="payment-mock-modal__amount-label">Card number</span>
                  <input
                    className="payment-mock-modal__input"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  />
                </label>
                <div className="payment-mock-modal__row">
                  <label className="payment-mock-modal__field">
                    <span className="payment-mock-modal__amount-label">Expiry</span>
                    <input
                      className="payment-mock-modal__input"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    />
                  </label>
                  <label className="payment-mock-modal__field">
                    <span className="payment-mock-modal__amount-label">CVC</span>
                    <input
                      className="payment-mock-modal__input"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      value={cvc}
                      onChange={(e) => setCvc(digitsOnly(e.target.value).slice(0, 4))}
                    />
                  </label>
                </div>
              </div>
            )}

            {method === 'paypal' && (
              <p className="payment-mock-modal__hint">PayPal checkout is simulated. No money is taken.</p>
            )}
            {method === 'apple' && (
              <p className="payment-mock-modal__hint">Apple Pay is simulated on this demo device.</p>
            )}
            {method === 'bank' && (
              <p className="payment-mock-modal__hint">Bank transfer details are simulated for this demo.</p>
            )}
            {method === 'card' && (
              <p className="payment-mock-modal__hint">Demo card only — use 4242 4242 4242 4242. Nothing is charged.</p>
            )}

            {error && <p className="payment-mock-modal__error">{error}</p>}

            <div className="payment-mock-modal__actions">
              {user && (
                <button
                  type="button"
                  className="payment-mock-modal__close"
                  onClick={() => { setError(''); setNameConfirmed(false) }}
                  disabled={busy}
                >
                  Back
                </button>
              )}
              <button type="submit" className="payment-mock-modal__confirm" disabled={busy}>
                {busy ? 'Processing…' : `Pay ${currency}${amount || '0'} (demo)`}
              </button>
              {!user && (
                <button type="button" className="payment-mock-modal__close" onClick={onClose} disabled={busy}>
                  Close
                </button>
              )}
            </div>
          </form>
        )}

        {step === 'done' && receipt && (
          <div className="payment-mock-modal__success">
            <div className="payment-mock-modal__check" aria-hidden="true">
              <i className="ri-check-line" />
            </div>
            <p className="payment-mock-modal__thanks">
              Thank you, {receipt.firstname} {receipt.lastname}.
            </p>
            <p className="payment-mock-modal__hint">
              {currency}{receipt.amount} pledged to {receipt.project}
              {receipt.guest ? ' as a guest' : ''}.
              {receipt.cardLast4 ? ` Card ending ${receipt.cardLast4}.` : ''}
            </p>
            <p className="payment-mock-modal__ref">Demo receipt {receipt.id}</p>
            <div className="payment-mock-modal__actions">
              <button type="button" className="payment-mock-modal__confirm" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
