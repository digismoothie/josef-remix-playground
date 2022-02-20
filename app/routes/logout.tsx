
import { Link, Form, json, redirect, useLoaderData } from "remix";

import type { ActionFunction} from 'remix'


export const action: ActionFunction = async ({
    context,request
}) => {
    const session = await context.sessionStorage.getSession(
        request.headers.get("Cookie")
    );
    return redirect("/login", {
        headers: { "Set-Cookie": await context.sessionStorage.destroySession(session) }
    });
};

export default function LogoutRoute() {
    return (
        <>
            <p>Are you sure you want to log out?</p>
            <Form method="post">
                <button>Logout</button>
            </Form>
            <Link to="/">Never mind</Link>
        </>
    );
}