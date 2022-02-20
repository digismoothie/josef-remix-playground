import { json, LoaderFunction, useLoaderData, Link } from "remix"

export const loader: LoaderFunction = async ({ context, request }) => {
  const session = await context.sessionStorage.getSession(
    request.headers.get("Cookie")
  )
  return json({ userId: session.get("userId")})
}


export default function Index() {
  const { userId } = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <p>{userId}</p>
      {
        userId ? <Link to="/logout">Log out</Link> : <Link to="/login">Log in</Link>
      }
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
