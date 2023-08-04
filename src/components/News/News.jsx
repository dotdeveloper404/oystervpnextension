import React, { useEffect } from 'react'
import styles from './style.module.css'
import Link from 'next/link';

const News = ({ news }) => {

    return (
        <div className={styles.newContainer}>
            <p className={styles.newsDescription}>{news.text}</p>
            <h4 className={styles.newsLink}><Link target='_blank' href={news.link}>{news.link_text}</Link></h4>
        </div>
    );
}

export default News