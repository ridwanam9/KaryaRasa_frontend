import withFlowbiteReact from "flowbite-react/plugin/nextjs";


/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
      },
    images: {
        domains: ['via.placeholder.com'],
      },
};

export default withFlowbiteReact(nextConfig);