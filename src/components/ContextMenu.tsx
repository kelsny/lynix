export default function ContextMenu({
    options,
    x,
    y,
    active,
}: {
    options: {
        icon: string;
        text: string;
        shortcut?: string;
        callback: () => void | Promise<void>;
    }[][];
    x: number;
    y: number;
    active?: boolean;
}) {
    if (!active || typeof active === "undefined") return null;

    return (
        <div
            className="contextmenu absolute z-50 flex flex-col w-80 bg-gray-900 rounded p-1"
            style={{ top: Math.min(y, window.innerHeight - 8 - options.flat().length * 28 - (options.length - 1) * 9), left: Math.min(x, window.innerWidth - 320) }}
        >
            {options.map((group, i, a) => (
                <div className="contextmenu-group flex flex-col" key={i}>
                    {group.map(({ icon, text, shortcut, callback }, i) => (
                        <div
                            className="contextmenu-item flex items-center justify-between hover:bg-gray-800 hover:bg-opacity-10 text-sm select-none rounded px-2 py-1 cursor-pointer"
                            onClick={callback}
                            key={i}
                        >
                            <div className="contextmenu-item-desc grid grid-cols-2">
                                <p className="text-gray-400 w-8">{icon}</p>
                                <p className="text-gray-100">{text}</p>
                            </div>
                            <p className="text-gray-600">{shortcut}</p>
                        </div>
                    ))}
                    {i !== a.length - 1 ? <div className="contextmenu-separator w-full bg-gray-800 my-1" style={{ height: 1 }}></div> : null}
                </div>
            ))}
        </div>
    );
}
