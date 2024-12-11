import { signIn } from "next-auth/react";

export default function Login() {
    return (
        <div>
            <button onClick={() => signIn("google")}>Login with Google</button>
            <button onClick={() => signIn("facebook")}>Login with Facebook</button>
            <button onClick={() => signIn("credentials", { email: "test", password: "test" })}>
                Login with Credentials
            </button>
        </div>
    );
}
