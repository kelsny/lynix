import { createContext } from "react";
import launch from "../launch";

export type WindowType = "browser" | "snake" | "settings";

export const typeToIcon: Record<WindowType, string> = {
    browser: "favicon.ico",
    snake: "snaek.png",
    settings: "favicon.ico",
};

export const allApps: {
    name: string;
    type: WindowType;
}[] = [
    {
        name: "Googol",
        type: "browser",
    },
    {
        name: "Snaek",
        type: "snake",
    },
    {
        name: "Settings",
        type: "settings",
    },
];

const windows = createContext<{
    ordered: {
        pid: string;
        type: WindowType;
        component: React.ReactNode;
    }[];
    current: {
        pid: string;
        type: WindowType;
        component: React.ReactNode;
    }[];
    add: (type: WindowType) => void;
    remove: (pid: string) => void;
    moveToTop: (pid: string) => void;
    update: (fn: Function) => void;
}>({
    ordered: [],
    current: [],
    add(type) {
        this.current.push(launch(type));
        this.ordered.push(launch(type));
    },
    remove(pid) {
        this.current = this.current.filter((w) => w.pid !== pid);
        this.ordered = this.ordered.filter((w) => w.pid !== pid);
    },
    moveToTop(pid) {
        this.current.push(
            this.current.splice(
                this.current.findIndex((w) => w.pid === pid),
                1
            )[0]
        );
    },
    update(fn: Function) {
        fn();
    },
});

export default windows;
