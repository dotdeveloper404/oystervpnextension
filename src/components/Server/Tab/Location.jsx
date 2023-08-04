'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import styles from '../style.module.css'
import Link from 'next/link'
import { Lines } from 'react-preloaders'
import Item from '../Item'
import { useEffect } from 'react'

const Location = ({ handleCloseModalServer, handleSelectedServer, server }) => {

    const [searchServer, setSearchServer] = useState(server);

    const handleSelectServer = (server) => {

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



    return (


        <div className={styles.serverList}>

            <div>

                <input type='text' placeholder='Search Location' onChange={searchLocation} className={styles.formControl} />

                <h5>All Locations</h5>

                {(searchServer.length == 0 ? server : searchServer)?.map((item) => (
                    <div key={'all' + item.server.server_id} className={styles.countrySection}>

                        <Item item={item} handleSelectServer={handleSelectServer} />

                    </div>

                ))}
            </div>

        </div>
    )
}

export default Location