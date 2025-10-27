const jwt = require("jsonwebtoken")

const generateToken = async (res, user) => {
    try {
        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        
        // --- Debugging Logs ---
        console.log(`[Token Generation] JWT Secret Used: ${process.env.JWT_SECRET ? 'Yes' : 'No'}`);
        console.log(`[Token Generation] Environment (process.env.ENV): ${process.env.ENV}`);
        console.log(`[Token Generation] Generated Token: ${token.substring(0, 10)}...`); // Log a snippet
        // ----------------------
       
        // Recommended Cookie Options Adjustment
        const cookieOptions = {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            httpOnly: true,                  
            // Since you are running on http://16.170.168.114, 'secure: true' will prevent the cookie from being set.
            // Temporarily set 'secure: false' for HTTP testing, but use 'true' in production with HTTPS.
            secure: false, // Must be false for HTTP testing

            // When frontend (5173) and backend (8080) are different ports (cross-origin), 
            // you need 'sameSite: "none"' for the browser to send it, BUT 'secure: true' is REQUIRED 
            // by browsers (Chrome, Firefox, etc.) if 'sameSite: "none"' is used.
            // Since you are using 'secure: false', you might need to temporarily use 'lax' or 'strict'
            // or simply remove 'sameSite' entirely if you're not using "none".
            // However, since it is a cross-origin scenario (different ports), "none" is usually required.

            // Let's use 'none' and keep 'secure: false' for debugging, but be aware this combination might fail
            // in modern browsers. The most reliable fix is to use HTTPS and set 'secure: true'.
            sameSite: "none", 
        };

        // If 'sameSite: "none"' and 'secure: false' does not work, try this combination:
        // const cookieOptions = {
        //     maxAge: 7 * 24 * 60 * 60 * 1000,
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: "lax", // This works for HTTP on the *same domain* (which IP is) but might fail on different ports
        // };

        res.cookie("token", token, cookieOptions);

        console.log("[Cookie Setting] Cookie set with options:", cookieOptions);
        // Note: res.cookies is not a standard way to see the set cookie object in Express response.
        // The cookie is set in the 'Set-Cookie' header, which you can inspect in your browser's Network tab.
        // You should see the 'Set-Cookie' header in the backend's response.
        
        return token
    } catch (error) {
        console.log("Error generating Token: ", error.message)
    }
}

module.exports = generateToken