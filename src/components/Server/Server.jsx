'use client'


import React from 'react'
import styles from './style.module.css'
import RecomendedLocation from './Tab/RecomendedLocation'
import Location from './Tab/Location'
import { useState } from 'react'
import { useEffect } from 'react'

const Server = ({ handleCloseModal, selectedServer, isOpen, location }) => {

    // const userInfo = JSON.parse(JSON.stringify(user));
    // console.log(userInfo)

    const [activeTab, setActiveTab] = useState('location');

    // const [location, setLocation] = useState({});

    const [locations, setLocations] = useState([]);
    const [smartLocation, setSmartLocation] = useState({});


    const handleTabLocation = () => {
        setActiveTab('location');
    }
    const handleTabRecomendedLocation = () => {
        setActiveTab("recomended");
    }

    const handleCloseModalServer = () => {
        handleCloseModal(false);
    }

    const handleSelectServer = (server) => {
        selectedServer(server);
    }


    const [allServers, setAllServers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchServers = async () => {

        setLoading(true);

        const response = await fetch('/api/server');

        const data = await response.json();

        setAllServers(data.data.data);

        const loc = location.loc.split(',');


        data.data.data.map((item) => {
            let res = distance(item.latitude, item.longitude, loc[0], loc[1])
            const obj = { server: item, distance: res }
            setLocations(oldArray => [obj, ...oldArray]);
        })

    }

    const distance = (lat1, lon1, lat2, lon2, unit) => {

        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit == "K") { dist = dist * 1.609344 }
            if (unit == "N") { dist = dist * 0.8684 }
            return dist;
        }
    }


    useEffect(() => {

        fetchServers();
        setLoading(false);

    }, [])

    return (
        <div className={styles.container} >
            <div className={styles.Tabs}>
                <ul className={styles.nav}>

                    <li

                        className={`${activeTab === 'location' ? "active" : ""} alllocation_tab`}
                        onClick={handleTabLocation}
                    >
                        All  Locations
                    </li>

                    <li
                        className={activeTab === "recomended" ? "active" : ""}
                        onClick={handleTabRecomendedLocation}
                    >
                        Recomended Locations
                    </li>


                </ul>
            </div>

            <div className={styles.outlet}>
                {activeTab === "location" ? <Location  handleCloseModalServer={handleCloseModalServer} handleSelectedServer={handleSelectServer}  server={locations} /> : <RecomendedLocation handleCloseModalServer={handleCloseModalServer} handleSelectedServer={handleSelectServer} isOpen={isOpen} server={locations} />}
            </div>



        </div>
    )
}

export default Server