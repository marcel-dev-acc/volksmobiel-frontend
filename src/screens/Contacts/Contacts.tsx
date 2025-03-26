import React from 'react'

import {useEffect, useRef, useState} from 'react'
import './Contacts.css'
import {useScreenContext} from '../../context/ScreenContext'
import {
  ArrowDownBoldCircleOutline,
  ArrowLeftBoldCircleOutline,
  ArrowUpBoldCircleOutline,
  Plus
} from '../../assets/icons'
import type {Contact} from '../../context/types'
import useContacts from '../../hooks/contacts'

const Contacts = (): JSX.Element => {
  const initialForm: Omit<Contact, 'id'> = {
    firstName: '',
    lastName: '',
    mobile: '',
    email: ''
  }

  const visibleItems = 5

  const {contacts} = useScreenContext()
  const contactsHook = useContacts()

  const initRef = useRef(false)

  const [state, setState] = useState<
    'contact-list' | 'contact-form--create' | 'contact-form--edit'
  >('contact-list')
  const [listIndex, setListIndex] = useState(0)
  const [form, setForm] = useState(initialForm)

  const handleListUp = (): void => {
    if (listIndex <= 0) {
      return
    }
    setListIndex(listIndex - 1)
  }

  const handleListDown = (): void => {
    if (listIndex + visibleItems >= contacts.length) {
      return
    }
    setListIndex(listIndex + 1)
  }

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setForm(prev => {
      const currentForm = {...prev}
      const key = e.target.id as keyof Omit<Contact, 'id'>
      currentForm[key] = e.target.value
      return currentForm
    })
  }

  const handleSubmit = (): void => {
    if (
      Object.values(form).filter(value => value.length === 0).length > 0
    ) {
      return
    }
    contactsHook.create(form)
    contactsHook.get()
    setState('contact-list')
  }

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      contactsHook.get()
    }
  }, [])

  return (
    <div className="contacts">
      {state === 'contact-list' && (
        <>
          <div className="contacts__navigation contacts__add-contact">
            <button
              className="contacts__navigation-btn"
              onClick={() => {
                setForm(initialForm)
                setState('contact-form--create')
              }}>
              <Plus />
            </button>
            <button
              onClick={handleListUp}
              className="contacts__navigation-btn">
              <ArrowUpBoldCircleOutline />
            </button>
          </div>
          {listIndex + visibleItems > visibleItems && (
            <i className="contacts__list__hint">
              Scroll up to see more...
            </i>
          )}
          <ul className="contacts__list">
            {contacts
              .filter(
                (_, index) =>
                  index >= listIndex && index < listIndex + visibleItems
              )
              .map(contact => (
                <li key={contact.id} className="contacts__contact">
                  <button
                    onClick={() => {
                      setForm(contact)
                      setState('contact-form--edit')
                    }}>
                    {contact.firstName} {contact.lastName}
                  </button>
                </li>
              ))}
          </ul>
          {listIndex + visibleItems < contacts.length && (
            <i className="contacts__list__hint">
              Scroll down to see more...
            </i>
          )}
          <div className="contacts__navigation">
            <button onClick={handleListDown}>
              <ArrowDownBoldCircleOutline />
            </button>
          </div>
        </>
      )}
      {(state === 'contact-form--create' ||
        state === 'contact-form--edit') && (
        <>
          <div className="contacts__form__back">
            <button
              onClick={() => {
                contactsHook.get()
                setState('contact-list')
              }}>
              <ArrowLeftBoldCircleOutline />
            </button>
          </div>
          <form className="contacts__form" action="#">
            <label className="contacts__form__label">
              First name
              <input
                id="firstName"
                type="text"
                required
                value={form.firstName}
                onChange={handleFormChange}
                placeholder="First name"
                className="contacts__form__input"
              />
            </label>
            <label className="contacts__form__label">
              Last name
              <input
                id="lastName"
                type="text"
                required
                value={form.lastName}
                onChange={handleFormChange}
                placeholder="Last name"
                className="contacts__form__input"
              />
            </label>
            <label className="contacts__form__label">
              Mobile
              <input
                id="mobile"
                type="text"
                required
                value={form.mobile}
                onChange={handleFormChange}
                placeholder="Mobile"
                className="contacts__form__input"
              />
            </label>
            <label className="contacts__form__label">
              Email
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={handleFormChange}
                placeholder="Email"
                className="contacts__form__input"
              />
            </label>
            <button
              className="contacts__form__button--primary"
              onClick={handleSubmit}>
              {state === 'contact-form--create' ? 'Create' : 'Update'}
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default Contacts
