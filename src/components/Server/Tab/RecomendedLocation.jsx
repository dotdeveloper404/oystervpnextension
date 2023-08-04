'use client'

import Image from 'next/image'
import React from 'react'
import styles from '../style.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Item from '../Item'

const RecomendedLocation = ({ handleCloseModalServer, handleSelectedServer, isOpen, server }) => {

    const [smartLocation, setSmartLocation] = useState({});
    const [recentLocation, setRecentLocation] = useState({});

    const [searchServer, setSearchServer] = useState(server);

    const handleSelectServer = (server) => {

        localStorage.removeItem('recentServer');
        localStorage.setItem('recentServer', JSON.stringify(server));

        handleCloseModalServer(false);
        handleSelectedServer(server);

    }

    const searchLocation = (e) => {

        const searchValue = e.target.value;

        const data = server?.filter((search) => {
            return search.server.name.toLowerCase().startsWith(searchValue.toLowerCase());
        })

        setSearchServer(data);
    }


    useEffect(() => {
        if (server.length > 0) {
            const _location = server.reduce((prev, curr) => prev.distance < curr.distance ? prev : curr);
            setSmartLocation(_location);
            // setRecentLocation(_location.server);
        }

        setRecentLocation(JSON.parse(localStorage.getItem('recentServer')));


    }, [])


    return (
        <div className={styles.serverList}>

            <div>

                <input type='text' placeholder='Search Location' onChange={searchLocation} className={styles.formControl} />

                <h5>Recent Location</h5>

                <div key={'recentLocation'} className={styles.countrySection}>

                    <button onClick={() => { handleSelectServer(recentLocation) }} className={styles.btnServerSelection}>
                        <Image alt="No Recent Location"
                            src={recentLocation.flag == undefined ? '/next-assets/VPN-Icon-Green.png' : recentLocation?.flag} width={23} height={20} />
                        <span className={styles.countryName}>{recentLocation.name == undefined ? 'No Recent Location' : recentLocation?.name}</span>
                    </button>

                </div>
            </div>

            <div>
                <h5>Smart Location</h5>
                <div key={'smartLocation'} className={styles.countrySection}>
                    {/* <button onClick={() => { handleSelectServer(smartLocation?.server) }} className={styles.btnServerSelection}>
                        <Image alt="" src={smartLocation?.server?.flag == undefined ?  '/next-assets/VPN-Icon-Green.png' : smartLocation?.server?.flag  } width={23} height={20} />
                        <span className={styles.countryName}>{smartLocation?.server?.name}</span>
                    </button> */}
                    <Item item={smartLocation} handleSelectServer={handleSelectServer} />
                </div>
            </div>

            <div>
                <h5>Recomended Location</h5>
                {(searchServer.length == 0 ? server : searchServer)?.map((item) => (
                    <div key={'rec' + item.server.server_id} className={styles.countrySection}>


                        <Item item={item} handleSelectServer={handleSelectServer} />

                        {/* <button onClick={() => { handleSelectServer(item.server) }} className={styles.btnServerSelection}>
                            <Image alt="" src={item.server.flag} width={23} height={20} />
                            <span className={styles.countryName}> {item.server.name}</span>
                            {item.server.tags?.map((tag, index) => (
                                <span className={styles.tags}>{tag}</span>
                            ))}
                        </button> */}

                    </div>

                ))}
            </div>

        </div>
    )
}

export default RecomendedLocation