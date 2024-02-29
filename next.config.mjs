/** @type {import('next').NextConfig} */
const nextConfig = {
    // compress: true,
    // poweredByHeader: false,
    // pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
    images: {
        // formats: ['image/avif', 'image/webp'],
        domains: [
            // 'back.sakhipoteka.study-traektoria.ru',
        ],
        remotePatterns: [
            {
                hostname: '**.img.avito.st',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    headers: () => [
        {
            source: '/',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store',
                },
            ],
        },
    ],
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/main',
            },
        ];
    },

    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            },
        )

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i

        return config
    },
};

export default nextConfig;
