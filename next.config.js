/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['api.oystervpn.com'],
       // unoptimized : true
    },
    // images: {
    //     remotePatterns: [
    //       {
    //         protocol: 'https',
    //         hostname: 'api.oystervpn.com',
    //         port: '',
    //         pathname: '',
    //       },
    //     ],
    //   },
    env: {
        API_URL: 'https://api.oystervpn.com/v1',
        NEXTAUTH_SECRET: 'LlKq8PtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx6gts='
    },

    reactStrictMode: true,
    swcMinify: true, 

    //  output  : 'export'

}

module.exports = nextConfig
