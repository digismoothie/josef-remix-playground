import { json, redirect, useLoaderData } from "remix";


export async function loader({context,  request }) {
    const session = await context.sessionStorage.getSession(
        request.headers.get("Cookie")
    );

    if (session.has("userId")) {
        // Redirect to the home page if they are already signed in.
        return redirect("/");
    }

    const data = { error: session.get("error") };

    return json(data, {
        headers: {
            "Set-Cookie": await context.sessionStorage.commitSession(session)
        }
    });
}

function validateCredentials(username: string, password: string) {
    if (username==="josef") {
        return 1
    }

    if (username === "test") {
        return 2
    }
}

export async function action({ context,request }) {
    const session = await context.sessionStorage.getSession(
        request.headers.get("Cookie")
    );
    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");

    const userId = await validateCredentials(
        username,
        password
    );

    if (userId == null) {
        session.flash("error", "Invalid username/password");

        // Redirect back to the login page with errors.
        return redirect("/login", {
            headers: {
                "Set-Cookie": await context.sessionStorage.commitSession(session)
            }
        });
    }

    session.set("userId", userId);

    // Login succeeded, send them to the home page.
    return redirect("/", {
        headers: {
            "Set-Cookie": await context.sessionStorage.commitSession(session)
        }
    });
}

export default function Login() {
    const { currentUser, error } = useLoaderData();

    return (
        <div>
            {error ? <div className="error">{error}</div> : null}
            <form method="POST">
                <div>
                    <p>Please sign in</p>
                </div>
                <label>
                    Username: <input type="text" name="username" />
                </label>
                <label>
                    Password:{" "}
                    <input type="password" name="password" />
                </label>
                <button type="submit">submit</button>
            </form>
        </div>
    );
}