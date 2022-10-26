export default {
    mongo: {
        USER: process.env.MONGO_USER,
        PASSWORD: process.env.MONGO_PASSWORD,
        DATABASE: process.env.MONGO_DATABASE
    },
    jwt: {
        SECRET: process.env.JWT_SECRET,
        COOKIE: process.env.JWT_COOKIE
    }
}