import dotenv from 'dotenv';

dotenv.config({
    path: `.env.${process.env.NODE_ENV ?? 'development'}`,
    quiet: true,
});

const ENV = process.env;

export default (configScheme) => {
    return Object.keys(configScheme).reduce((acc, name) => {
        const NAME = String(name).toUpperCase();

        acc[NAME] = ENV?.[NAME] ?? configScheme[name] ?? null;

        return acc;
    }, {});
};
