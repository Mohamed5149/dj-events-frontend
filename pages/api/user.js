import cookie from "cookie";
import { API_URL } from "../../config/index";

export default async (req, res) => {
    if (!req.headers.cookie) {
        res.status(403).json({ message: 'not authorized' })
        return
    }
    const { token } = cookie.parse(req.headers.cookie)
    const strapiRes = await fetch(`${API_URL}/api/users/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer${token}`
        }
    })
    const user = await strapiRes.json()
    res.status(200).json({ user })
}