import cookie from "cookie";
import { API_URL } from "../../config/index";

export default async (req, res) => {
    const { identifier, password } = req.body;
    const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identifier,
            password
        })
    })
    const data = await strapiRes.json()
    res.setHeader(
        'Set-Cookie', cookie.serialize(
            'token', data.jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "strict",
            path: "/"
        }
        )
    )

    res.status(200).json({ user: data.user })
}