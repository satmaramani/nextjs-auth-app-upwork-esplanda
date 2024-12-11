import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) router.push("/login");
    };

    return (
        <form onSubmit={handleSignup}>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Signup</button>
        </form>
    );
}