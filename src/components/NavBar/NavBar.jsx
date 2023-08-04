'use-client'




import React from 'react'
import { useState } from 'react'
import styles from './style.module.css'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const NavBar = ({ handleNavClick,navActive }) => {

    const [isActive,setIsActive] = useState(false);

    const handleClick = () => {

        handleNavClick(false)
    }

    return (
        <>
            <div id="mySidenav" style={{ width: navActive == true ? '250px' : '0px' }} className={styles.sidenav}>
                <button className={styles.closebtn} onClick={handleClick}  >&times;</button>

                <Link href='/home'>Home</Link>
                <a href="/about">About</a>
                <a href="/services">Services</a>
                <Link target='_blank' href="https://oystervpn.com/download/?utm_source=app&utm_medium=windows&utm_campaign=contact">Privacy & Security Tools</Link>
                <Link target='_blank' href="https://support.oystervpn.com/?utm_source=app&utm_medium=windows&utm_campaign=contact">Help & Support</Link>
                <Link style={{ color: 'white', background: 'linear-gradient(90deg, rgba(0, 145, 48, 1) 17%, rgba(0, 129, 145, 1) 81%)' }} href={'#'} onClick={signOut}>Sign Out</Link>
            </div>

        </>
    )
}

export default NavBar