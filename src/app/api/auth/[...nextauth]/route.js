import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from 'next/headers'


const handler = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",

            async authorize(credentials) {

                try {

                    const baseUrl = process.env.API_URL;
                    const response = await fetch("https://api.oystervpn.com/v1/authenticate", {
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: {
                            'Access-Control-Allow-Origin': "*",
                            'Content-Type': 'application/json',
                            'X-PLATFORM': 'web',
                            'Access-Control-Allow-Credentials': true
                        }

                    });
                    
                    const data = await response.json();
                    cookies().delete('token');
                    var d = new Date();
                    var date = new Date(d.getFullYear + 1, d.getMonth, d.getDay);
                    // cookies().set('token',data.data.token);
                    cookies().set({
                        name: 'token',
                        value: data.data.token,
                        expires: date,
                        maxAge : 31536000,
                        path: '/'
                    });

                    return data;


                    // if(data.error){
                    //     console.log('',data);
                    // }else{
                    //     console.log('',data);
                    // }

                    // return {
                    //     token: data.data.token,
                    //     user : data.data.userinfo
                    // };

                } catch (err) {
                    throw new Error(err);
                }
            }
        })
    ],
    
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {

        jwt: async ({ token, user }) => {
            return { ...token, ...user }
        },
        session: async ({ session, token, user }) => {
            session.user = token; //setting token in session
            return session;
        }
        // jwt: async ({ session,token, user }) => {
        //   //  user && (token.user == user);
        //     return user;
        // },
        // session: async ({ session, token }) => {
        //   //  session.user = token.user; //setting token in session
        //     return session;
        // }
    },
    pages: {
        signIn: "/api/auth/signin", //Need to define custom login page (if using)
        error: "/login",
    }

});

export { handler as GET, handler as POST }