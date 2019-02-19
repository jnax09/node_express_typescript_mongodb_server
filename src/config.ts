const env = process.env.NODE_ENV || 'development';

const configOptions = {
    env,
    secrets: {
        jwt: process.env.JWT_SECRET,
        jwtExp: '1h',
    },
    requireAuth: true,
    port: process.env.PORT,
    dbUrl:
        env === 'development'
            ? process.env.MONGO_URI
            : env === 'test'
            ? process.env.MONGO_URI_TEST
            : '',
};

export default configOptions;
