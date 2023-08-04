import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET(req, res) {

    try {
        const cookieStore = cookies()
        const token =  cookieStore.get('token');
      
        const response = await fetch(process.env.API_URL + '/servers', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token.value}`,
                'Access-Control-Allow-Origin': "*",
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-PLATFORM': 'web',
                'Access-Control-Allow-Credentials': true
            },
            //  next : { revalidate : 60}
            cache : 'force-cache',
        });

        const data = await response.json();

        return Response.json({data : data})
        // return  NextResponse.json({ data });


    } catch (error) {
        return Response.json({error : error})
        // return  NextResponse(error, { status: 500 });
    }
}




