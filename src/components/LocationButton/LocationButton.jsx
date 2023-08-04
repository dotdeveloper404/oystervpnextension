import React from 'react'
import styles from './style.module.css'
import Image from 'next/image';

const LocationButton = ({ currentServer, setModalShow }) => {

    const setModal = () => {
        setModalShow(true);
    }

    return (
        <>
            {currentServer != null ? (
                <button onClick={setModal} className={styles.btnServerSelection}>

                    <Image alt="" className={styles.image} src={currentServer.flag} width={23} height={20} />

                    <span> {currentServer.city.name} , {currentServer.name} </span>

                </button>
            ) :
                <button onClick={setModal} className={styles.btnServerSelection}>

                    <span> Select Your Server</span>

                </button>
            }
        </>

    )
}

export default LocationButton