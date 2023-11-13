import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp, usePage } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import useUserInitializer from "./Pages/Auth/UserInitializer";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        delete el.dataset.page;

        root.render(
            <Provider store={store}>
                <App {...props} />
            </Provider>
        );

        // root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
