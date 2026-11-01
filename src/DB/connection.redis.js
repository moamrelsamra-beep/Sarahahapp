import { createClient } from "redis";

export const redis_client = createClient({
    url: process.env.REDIS_URL
});


export default async function connectionRedis() {
    try {
        await redis_client.connect();
        console.log("Redis Connecteed Successfully.........!!!!!!!!");
        
    } catch (error) {
        console.log("Redis connection Failed..........!!!");
        
    }
}