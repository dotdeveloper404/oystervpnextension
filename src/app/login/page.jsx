'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/app/login/page.module.css'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { signIn, useSession, getProviders } from 'next-auth/react'
import Image from 'next/image'
// import { ColorRing } from 'react-loader-spinner'
import Logo from '@/components/Logo'

const Login = () => {

    const router = useRouter();

    const session = useSession();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setIsLoading] = useState(false);
    const params = useSearchParams();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setError(params.get("error"));
        setSuccess(params.get("success"));
    }, [params]);


    if (session.status === "loading") {
        return <p>Loading</p>;
        //    return <p style={{ textAlign: 'center' }}>Loading...</p>;
    }

    if (session.status === "authenticated") {

        setTimeout(() => {
            router?.push("/home");
        }, 100)

    }



    const handleSubmit = async (e) => {

        e.preventDefault();

        if (email == '') {
            setError('Email Required');
            return;
        } if (password == '') {
            setError('Password Required');
            return;
        }

        setError('');


        setIsLoading(true);

        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setIsLoading(false);

        // console.log(response)


    }

    return (

        <div className={styles.container} >

            <Logo style={styles.logo} />

            <div className={styles.formDiv}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input className={styles.form_control} value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete='username' name="email" placeholder='Enter your email' id="email" />
                    <input className={styles.form_control} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='current-password' type="password" name="password" placeholder='Enter your password' id="password" />
                    <div className={styles.links}>
                        <Link className={styles.hrefs} href={'/forgot'}>Forgot Password?</Link>
                        <Link className={styles.hrefs} target='_blank' href={'https://www.oystervpn.com/buy-vpn'}>Sign Up?</Link>
                    </div>
                    <div className={styles.error}>{error}</div>
                    <div>
                        {loading && <span>Loading...</span>}
                    </div>
                    <button disabled={loading} className={styles.btn}>Login</button>
                </form>
            </div>
        </div>


    )
}

export default Login