import React from 'react'
import styles from './style.module.css'
import Image from 'next/image'

const Item = ({ item, handleSelectServer }) => {

    const handleItem = (data) => {

        handleSelectServer(data);
    }

    return (
        <>
            <button onClick={() => { handleItem(item?.server) }} className={styles.btnServerSelection}>
                <Image alt="" className={styles.image} src={item?.server?.flag == undefined  ? '/next-assets/VPN-Icon-Green.png' : item?.server?.flag  } width={23} height={20} />
                <span className={styles.countryName}> {item?.server?.name}</span>
                {item?.server?.tags?.map((tag, index) => (
                    <span  key={'tag' + index} className={styles.tags}>{tag}</span>
                ))}
            </button>
        </>
    )
}

export default Item