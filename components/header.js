import Link from 'next/link'
import styles from '../styles/header.module.css'
import Search from './search'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import AuthContext from '../context/authContext'
import { useContext } from 'react'

export default function Header() {

  const { user, logout } = useContext(AuthContext)

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>DJ Events</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Events</a>
            </Link>
          </li>
          {user ?
            <>
              <li>
                <Link href='/events/add'>
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>
              <button className='btn-secondary' onClick={() => logout()}>
                <FaSignOutAlt /> Log out
              </button>
            </> :
            <>
              <li>
                <Link href='/account/login'>
                  <a className='btn-secondary btn-icon'>
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </>
          }
        </ul>
      </nav>
    </header>
  )
}