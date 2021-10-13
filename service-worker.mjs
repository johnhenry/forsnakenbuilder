import {
  Route,
  Router,
  updateRequest,
  ActionSingle,
} from "https://johnhenry.github.io/std/js/router@0.0.0/index.mjs";

const pathname = globalThis.location.href;
const local = pathname.substring(0, pathname.lastIndexOf("/")); // This folder's location
// const remote = `${globalThis.location.origin}/htmlbuilder`;
const remote = `https://johnhenry.github.io/htmlbuilder`; // Remote folder's location

const replacements = [
  // These routes replace calls to the remote application with calls to the local one.
  new Route(ActionSingle(`${local}/defaults.html`), `${local}/defaults.html`),
  new Route(
    ActionSingle(`${local}/index.webmanifest`),
    `${local}/index.webmanifest`
  ),
  new Route(
    ActionSingle(`${local}/icons/icon-32.png`),
    `${local}/icons/icon-32.png`
  ),
  new Route(
    ActionSingle(`${local}/icons/icon-512.png`),
    `${local}/icons/icon-512.png`
  ),
  // new Route(
  //   ActionSingle(
  //     `http://localhost:8080/app/web/forsnaken/internal-timer.component.mjs`
  //   ),
  //   `https://johnhenry.github.io/app/web/forsnaken/internal-timer.component.mjs`
  // ),
  // new Route(
  //   ActionSingle(
  //     `http://localhost:8080/app/web/forsnaken/event-consumer/index.component.mjs`
  //   ),
  //   `https://johnhenry.github.io/app/web/forsnaken/event-consumer/index.component.mjs`
  // ),
  // new Route(
  //   ActionSingle(
  //     `http://localhost:8080/app/web/forsnaken/canvasrenderer/index.component.mjs`
  //   ),
  //   `https://johnhenry.github.io/app/web/forsnaken/canvasrenderer/index.component.mjs`
  // ),
  // new Route(
  //   ActionSingle(
  //     `http://localhost:8080/app/web/forsnaken/SnakeGame/objects/index.component.mjs`
  //   ),
  //   `https://johnhenry.github.io/app/web/forsnaken/SnakeGame/objects/index.component.mjs`
  // ),
  // new Route(
  //   ActionSingle(
  //     `http://localhost:8080/app/web/forsnaken/pixelshaders/zoom-shader.component.mjs`
  //   ),
  //   `https://johnhenry.github.io/app/web/forsnaken/pixelshaders/zoom-shader.component.mjs`
  // ),
  // new Route(
  //   ActionSingle(
  //     `http://localhost:8080/app/web/forsnaken/pixelshaders/grid-shader.component.mjs`
  //   ),
  //   `https://johnhenry.github.io/app/web/forsnaken/pixelshaders/grid-shader.component.mjs`
  // ),
];

// This route forwards requests to from local app to the target
const GetApplication = new Route(
  async (request, _, match) =>
    fetch(
      await updateRequest(request, `${remote}/${match.url[1] || ""}`, {
        mode: "cors",
      })
    ),
  new RegExp(`^${local}\/?(.+)?$`)
);

// This route simply forwards any requests.
const DefaultRoute = new Route((request) => fetch(request));

// The router is a collectoin of routes.
const router = new Router(...replacements, GetApplication, DefaultRoute);

globalThis.addEventListener("fetch", (event) =>
  event.respondWith(router.send(event.request))
);

// Additional Notes:
// Routes and routers can be nested using the send event.
// const superRouter = new Router(
//   new Route((request)=>router.send(request))
// );
// globalThis.addEventListener('fetch', (event) => event.respondWith(superRouter.send(event.request)));

// https://github.com/pillarjs/path-to-regexp can be used to create regular expressions from express string syntax
