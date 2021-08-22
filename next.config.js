const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        domains: ["picsum.photos"],
    },
    basePath: isProd ? "/nextjs-mdx" : "",
};
