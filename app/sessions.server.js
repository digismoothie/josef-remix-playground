import {
    createCookie,
    createCloudflareKVSessionStorage
} from "remix";

// In this example the Cookie is created separately.
const sessionCookie = createCookie("__session", {
    secrets: ["r3m1xr0ck5"],
    sameSite: true
});

const { getSession, commitSession, destroySession } =
    createCloudflareKVSessionStorage({
        // The KV Namespace where you want to store sessions
        kv: YOUR_NAMESPACE,
        cookie: sessionCookie
    });

export { getSession, commitSession, destroySession };