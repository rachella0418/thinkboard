import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        // change my-limit-key to userid to limit that user
        const {success} = await rateLimit.limit("my-limit-key");
        if (!success) {
            return res.status(429).json({
                message: "Too many request. Try again later"
            })
        }
        next();
    } catch (error) {
        console.log("Rate limit error", error);
        next(error); 
    }
}

export default rateLimiter;