// config is the default configuration
export default ({ config }) => {
    // This is how you can distinguish the `build` command from the `serve`
    const isBuild = config.mode === 'production';

    return {
        ...config,
        module: {
            rules: [{
                test: /\.worker.js$/,
                use: {
                    loader: 'worker-loader',
                    options: { inline: 'no-fallback' }
                }
            }, ...config.module.rules],
        },
    };
}