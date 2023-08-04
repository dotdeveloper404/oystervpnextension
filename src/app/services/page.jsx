'use client'

import React, { useState } from 'react'
import styles from '@/app/services/page.module.css'
import NavBar from '@/components/NavBar/NavBar'
import Logo from '@/components/Logo'
const Services = () => {

    const [navActive, setNavActive] = useState(false);

    const handleNavClick = (value) => {

        setNavActive(value);

    }

    return (
        <>
            <div className={styles.container}>

                <div className={styles.lblConnect}>
                    <div style={{ color: 'black', display: "flex" }}>
                        <span style={{ fontSize: "20px", cursor: 'pointer' }} onClick={() => { handleNavClick(true) }}>&#9776; </span>
                        <Logo style={styles.logo} />
                    </div>
                </div>

              

                <NavBar handleNavClick={handleNavClick} navActive={navActive} />

            </div>


        </>

    )
}

export default Services