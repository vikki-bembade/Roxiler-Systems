import jwt from "jsonwebtoken";

const Authentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("AUTHENTICATION DEBUG:");
    console.log("Auth header received:", authHeader ? "YES" : "NO");
    console.log("Auth header value:", authHeader ? authHeader.substring(0, 40) + "..." : "NONE");
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
    console.log("JWT_SECRET length:", process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);

    if (!authHeader) {
        console.log(" NO AUTH HEADER");
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const parts = authHeader.split(" ");
    console.log("Auth parts count:", parts.length);
    console.log("First part:", parts[0]);

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        console.log(" INVALID FORMAT");
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }

    const token = parts[1];
    console.log("Token to verify:", token.substring(0, 30) + "...");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("TOKEN VERIFIED. Decoded:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(" TOKEN VERIFICATION FAILED:", error.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token", error: error.message });
    }
};

export default Authentication;