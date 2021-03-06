import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import ActiveWindows from "../components/ActiveWindows";
import ContextMenu from "../components/ContextMenu";
import Prelude from "../components/misc/Prelude";
import Shortcuts from "../components/Shortcuts";
import Launcher from "../components/tasks/Launcher";
import LauncherButton from "../components/tasks/LauncherButton";
import Taskbar from "../components/tasks/Taskbar";
import TaskbarInfo from "../components/tasks/TaskbarInfo";
import settings from "../lib/global/settings";

const hiddenContextMenu = <ContextMenu options={[]} x={0} y={0} />;

export default function Index({ assetPrefix }: { assetPrefix: string }) {
    const [contextMenu, setContextMenu] = useState(<ContextMenu options={[]} x={0} y={0} />);
    const [launcherActive, setLauncherActive] = useState(false);
    const [infoActive, setInfoActive] = useState(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 50);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <Prelude />
            <Shortcuts setLauncherActive={setLauncherActive} />
            <settings.Consumer>
                {(config) => (
                    <div
                        className="desktop absolute top-0 left-0 w-full h-full flex flex-col"
                        style={{ filter: `brightness(${config.current.brightness})` }}
                        onClick={(e) => {
                            if (
                                !(e.target as HTMLElement).closest(".launcher")?.classList.contains("launcher") &&
                                !(e.target as HTMLElement).closest(".launcher-button")?.classList.contains("launcher-button") &&
                                !(e.target as HTMLElement).closest(".taskbar-info")?.classList.contains("taskbar-info")
                            ) {
                                setLauncherActive(false);
                                setInfoActive(false);
                            }

                            setContextMenu(hiddenContextMenu);
                        }}
                        onContextMenu={(e) => {
                            e.preventDefault();

                            return setContextMenu(
                                <ContextMenu
                                    options={[
                                        [
                                            {
                                                callback() {},
                                                icon: "ok",
                                                text: "ok",
                                                shortcut: "ok",
                                            },
                                        ],
                                        [
                                            {
                                                callback() {},
                                                icon: "ok",
                                                text: "ok",
                                                shortcut: "ok",
                                            },
                                        ],
                                    ]}
                                    x={e.clientX}
                                    y={e.clientY}
                                    active
                                />
                            );
                        }}
                    >
                        <div className="taskbar-container relative bg-gray-800 bg-opacity-50 flex items-center h-8 w-full">
                            <LauncherButton launcherActive={launcherActive} setLauncherActive={setLauncherActive} />
                            <Taskbar />
                            <TaskbarInfo time={time} infoActive={infoActive} setInfoActive={setInfoActive} />
                            <Launcher launcherActive={launcherActive} setLauncherActive={setLauncherActive} />
                        </div>
                        <div className="apps flex-1"></div>
                        {contextMenu}
                        <ActiveWindows />
                    </div>
                )}
            </settings.Consumer>
        </>
    );
}

//@ts-ignore
export const getStaticProps: GetStaticProps = () => {
    return {
        props: {
            assetPrefix: process.env.NODE_ENV === "production" ? "/lynix" : "",
        },
    };
};
