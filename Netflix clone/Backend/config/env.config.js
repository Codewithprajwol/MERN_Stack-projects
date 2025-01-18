import 'dotenv/config'

export const ENV_VAR={
    port:process.env.PORT || 3000,
    mongoUrl:process.env.MONGO_URL,
    secret_key:process.env.SECRET_KEY,
    node_env:process.env.NODE_ENV,
    tmdb_api_key:process.env.TMDB_API_KEY,
}