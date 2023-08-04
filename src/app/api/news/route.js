import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res) {

    try {

        const cookie = cookies();

        const token = cookie.get('token');


        const response = await fetch(process.env.API_URL + "/news?orderby=id&orderdir=DESC&perpage=1&device=web", {
            method: "GET",
            headers: {

                'Authorization': `Bearer ${token.value}`,
                'Access-Control-Allow-Origin': "*",
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-PLATFORM': 'web',
                'Access-Control-Allow-Credentials': true

            },
            cache: 'force-cache',

        })

        const data = await response.json();
        return Response.json({data : data})
    //   return new NextResponse.json({ data })

    } catch (err) {

        return Response.json({error : err})
        //  return new NextResponse(err, { status: 500 });
    }

}