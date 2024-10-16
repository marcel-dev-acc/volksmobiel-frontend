

import { useEffect, useRef, useState } from 'react'
import './Contacts.css'
import { useScreenContext } from '../../context/ScreenContext'
import { ArrowUpBoldCircleOutline, ArrowDownBoldCircleOutline, Plus, ArrowLeftBoldCircleOutline } from '../../assets/icons'
import { Contact } from '../../context/interfaces/types'



const Contacts = () => {

  const initialForm: Omit<Contact, 'id'> = {
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
  }

  const visibleItems = 5;

  const { interfaces, contacts } = useScreenContext()

  const initRef = useRef(false)

  const [state, setState] = useState<'contact-list' | 'contact-form--create' | 'contact-form--edit'>('contact-list')
  const [listIndex, setListIndex] = useState(0)
  const [form, setForm] = useState(initialForm)

  const handleListUp = () => {
    if (listIndex <= 0) {
      return
    }
    setListIndex(listIndex - 1)
  }

  const handleListDown = () => {
    if (listIndex + visibleItems >= contacts.length) {
      return
    }
    setListIndex(listIndex + 1)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => {
      const currentForm = {...prev}
      const key = e.target.id as keyof Omit<Contact, 'id'>
      currentForm[key] = e.target.value
      return currentForm
    })
  }

  const handleSubmit = () => {
    if (Object.values(form).filter(value => value.length === 0).length > 0) {
      return
    }
    interfaces.current.contacts.create(form)
    interfaces.current.contacts.get()
    setState('contact-list')
  }

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      interfaces.current.contacts.get()
    }
  }, [interfaces])

  return (
    <div className="contacts">
      {state === 'contact-list' && (
        <>
          <div className="contacts__navigation contacts__add-contact">
            <button
              onClick={() => {
                setForm(initialForm)
                setState('contact-form--create')
              }}
            >
              <Plus />
            </button>
            <button onClick={handleListUp}>
              <ArrowUpBoldCircleOutline />
            </button>
          </div>
          {(listIndex + visibleItems) > visibleItems && <i className='contacts__list__hint'>Scroll up to see more...</i>}
          <ul className="contacts__list">
            {contacts.filter((_, index) => index >= listIndex && index < (listIndex + visibleItems)).map(contact => (
              <li key={contact.id} className='contacts__contact'>
                <button
                  onClick={() => {
                    setForm(contact)
                    setState('contact-form--edit')
                  }}
                >
                  {contact.firstName} {contact.lastName}
                </button>
              </li>
            ))}
          </ul>
          {(listIndex + visibleItems) < contacts.length && <i className='contacts__list__hint'>Scroll down to see more...</i>}
          <div className="contacts__navigation">
            <button onClick={handleListDown}>
              <ArrowDownBoldCircleOutline />
            </button>
          </div>
        </>
      )}
      {(state === 'contact-form--create' || state === 'contact-form--edit') && (
        <>
          <div className='contacts__form__back'>
            <button
              onClick={() => {
                interfaces.current.contacts.get()
                setState('contact-list')
              }}
            >
              <ArrowLeftBoldCircleOutline />
            </button>
          </div>
          <form className='contacts__form' action='#'>
            <label className='contacts__form__label'>
              First name
              <input
                id='firstName'
                type="text"
                required
                value={form.firstName}
                onChange={handleFormChange}
                placeholder='First name'
                className='contacts__form__input'
              />
            </label>
            <label className='contacts__form__label'>
              Last name
              <input
                id='lastName'
                type="text"
                required
                value={form.lastName}
                onChange={handleFormChange}
                placeholder='Last name'
                className='contacts__form__input'
              />
            </label>
            <label className='contacts__form__label'>
              Mobile
              <input
                id='mobile'
                type="text"
                required
                value={form.mobile}
                onChange={handleFormChange}
                placeholder='Mobile'
                className='contacts__form__input'
              />
            </label>
            <label className='contacts__form__label'>
              Email
              <input
                id='email'
                type="email"
                required
                value={form.email}
                onChange={handleFormChange}
                placeholder='Email'
                className='contacts__form__input'
              />
            </label>
            <button
              className='contacts__form__button--primary'
              onClick={handleSubmit}
            >
              {state === 'contact-form--create' ? 'Create' : 'Update'}
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default Contacts
