// This page used to proxy HTML Builder through a service worker. It's now a
// redirect, so this worker only removes itself from browsers that installed
// it, and reloads their open pages so they get the redirect.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", async () => {
  await self.registration.unregister();
  for (const client of await self.clients.matchAll({ type: "window" })) client.navigate(client.url);
});
