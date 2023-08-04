import React from 'react'

import logo from '../../public/next-assets/VPN-Icon-Green.png'
import Image from 'next/image'

const Logo = ({style}) => {
    return (
        <div className={style}>
            <Image alt="OysterVPN" src={logo} />
        </div>
    )
}

export default Logo