import { createClient } from "redis";

export const redis_client = createClient({
    url:"rediss://default:gQAAAAAAA5PkAAIgcDE1NzE2YzFjYTRiODI0YWU3YTkxODcyYzg4MjA2NTYyZQ@refined-tortoise-234468.upstash.io:6379"
});


export default async function connectionRedis() {
    try {
        await redis_client.connect();
        console.log("Redis Connecteed Successfully.........!!!!!!!!");
        
    } catch (error) {
        console.log("Redis connection Failed..........!!!");
        
    }
}