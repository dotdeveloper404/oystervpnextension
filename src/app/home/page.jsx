'use client'

import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react'
import styles from './page.module.css'
import logo from '../../../public/next-assets/VPN-Icon-Green.png'
import greendot from '../../../public/next-assets/green-dot.png'
import greydot from '../../../public/next-assets/grey-dot.png'
import protectedImage from '../../../public/next-assets/check.png'
import unprotectedImage from '../../../public/next-assets/close.png'
import React, { useState } from 'react'
import Image from 'next/image';
import Logo from '@/components/Logo';
import Modal from 'react-modal';
import Server from '@/components/Server/Server';
import { useEffect } from 'react';
import LocationButton from '@/components/LocationButton/LocationButton';
import News from '@/components/News/News';
import NavBar from '@/components/NavBar/NavBar';
import Stopwatch from '@/components/Stopwatch/Stopwatch';

const Home = () => {

    const session = useSession();
    const router = useRouter();

    const [config, setConfig] = useState([]);
    const [url, setUrl] = useState('');


    const [connect, setConnect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState({});
    const [navActive, setNavActive] = useState(false);


    const [currentServer, setCurrentServer] = useState(null);
    const [news, setNews] = useState(null);

    const [modalShow, setModalShow] = useState(false);

    const customStyles = {
        content: {
            width: '410px',
            height: '556px',
            top: '33%',
            left: '13.5%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
        },
    };

    if (session.status == 'unauthenticated') {

        setTimeout(() => {
            router?.push('/login');
        }, 100)

    }

    const handleConnect = (e) => {
        e.preventDefault();

        // setLoading(true);


        /* Connection */


        var pConfig = {
            mode: '',
            pacScript: {},
            rules: {},
        };


        pConfig.mode = "fixed_servers";
        pConfig['rules']['bypassList'] = [];
        pConfig['rules']['singleProxy'] = {
            scheme: 'http',
            host: 'il-tel-01.serverintoshell.com',
            port: 8190,

        };

        setConfig(pConfig);
        console.log(config)

            
            // var _config = {
            //   mode: "fixed_servers",
            //   rules: {
            //     proxyForHttp: {
            //       scheme: "http",
            //       host: 'il-tel-01.serverintoshell.com',
            //       port: 8190,
            //     },
            //     bypassList: []
            //   }
            // };
            
            // chrome.proxy.settings.set(
            //     {value: _config, scope: 'regular'},
            //     function() {});
            

        // chrome.proxy.settings.set(
        //     { value: pConfig, scope: 'regular' }, function () { }
        // );



        /* End Connection */

        setConnect(true);

    }

    const handleDisconnect = (e) => {
        e.preventDefault();

        setConnect(false);
        setLoading(false);
    }

    const fetchLocation = async () => {
        const response = await fetch('https://ipinfo.io?token=5d89e4eb4405fc');
        const data = await response.json();
        setLocation(data);
    }

    const fetchNews = async () => {

        const response = await fetch('/api/news/');
        const data = await response.json();
        // console.log(data)
        setNews(data.data.data.data[0]);


    }

    useEffect(() => {

        fetchLocation();

        fetchNews();

        const queryInfo = { active: true, lastFocusedWindow: true };

        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            const url = tabs[0].url;
            setUrl(url);
        });


    }, [])

    const selectServer = (server) => {
        setCurrentServer(server);
        console.log(server);
    }

    const handleCloseModal = () => {
        setModalShow(false);
    }

    const handleNavClick = (value) => {

        setNavActive(value);

    }

    return (
        <>
            <div className={styles.container}>

                <div className={styles.lblConnect}>
                    <div style={{ color: 'black', display: "flex" }}>
                        <span style={{ fontSize: "20px", cursor: 'pointer' }} onClick={() => { handleNavClick(true) }}>&#9776; </span>
                        <span style={{ paddingLeft: '150px' }}> <Image alt="" src={connect == true ? greendot : greydot} width={10} height={10} /> {connect ? 'Connected' : 'Disconnected'}</span>
                    </div>
                </div>

                <NavBar handleNavClick={handleNavClick} navActive={navActive} />

                {/* <div id="mySidenav" style={{ width: navActive == true ? '250px' : '0px' }} className={styles.sidenav}>
                    <button className={styles.closebtn} onClick={() => { handleNavClick(false) }}  >&times;</button>

                    <Link href='/home'>Home</Link>
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                    <Link style={{ color: 'white', background: 'linear-gradient(90deg, rgba(0, 145, 48, 1) 17%, rgba(0, 129, 145, 1) 81%)' }} href={'#'} onClick={signOut}>Sign Out</Link>
                </div> */}


                <Logo style={styles.logo} />

                <div className={styles.lblLocation}>
                    <span>{location.city} , {location.country} {location.ip}</span>

                    

                </div>

                <Modal
                    isOpen={modalShow}
                    onRequestClose={handleCloseModal}
                    contentLabel="OysterVPN Servers"
                    ariaHideApp={false}
                    style={customStyles}
                >

                    <Server isOpen={modalShow} handleCloseModal={handleCloseModal} selectedServer={selectServer} location={location} />

                </Modal>

                <div className={styles.countrySection}>

                    <LocationButton setModalShow={() => setModalShow(true)} currentServer={currentServer} />

                </div>

                <div className={styles.btns}>

                    {connect == false ?
                        <button onClick={handleConnect} className={styles.connectBtn}> Connect </button> :
                        <button onClick={handleDisconnect} className={styles.disconnectBtn}> Disconnect</button>
                    }

                </div>

                <div className={styles.loading}>
                </div>

                <div className={styles.connectionStatus}>
                    <div className={styles.connectionStatusDiv1}>
                        <span>Connection Status :</span> <br />
                        <label>{connect ? "Proctected " : "Un Proctected "}</label>
                        <Image alt="" height={10} width={10} src={connect == true ? protectedImage : unprotectedImage} />
                    </div>
                    <div className={styles.connectionStatusDiv2}>
                        <Stopwatch isRunning={connect} />
                    </div>
                </div>


                {news != null ? <News news={news} /> : ''}



            </div>
        </>
    )
}

export default Home