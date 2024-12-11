import { useSession, signIn } from "next-auth/react";

export default function Protected() {
    const { data: session } = useSession();
    if (!session) return <button onClick={() => signIn()}>Login</button>;
    return <div>Welcome to the protected page, {session.user?.email}</div>;
}