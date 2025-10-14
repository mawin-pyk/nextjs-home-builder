import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function verifyToken(allowRoles = []) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);

        if (allowRoles.length > 0 && !allowRoles.includes(payload.role)) {
            return null;
        }

        return payload;

    } catch (error) {
        return null;
    }
}