import { useEffect, useRef, type FC } from "react";
import Display from "./display-when";
import "./dialog.css";

type LoaderProps = {
    text: string;
    open: boolean;
}
// Infinite Loader
const Loader: FC<LoaderProps> = ({ text, open = false }) => {
    const progressRef = useRef<HTMLDivElement>(null);
    // Infinite loader
    useEffect(() => {
        const { current: progress } = progressRef;
        let to: ReturnType<typeof setTimeout> | undefined;
        if (progress) {
            let percent = 0;
            const tick = () => {
                ++percent;
                if (percent >= 100) {
                    percent = 0;
                }
                progress.style.width = `${percent}%`;
                to = setTimeout(tick, 100);
            };
            to = setTimeout(tick, 100);
        }
        // Clear on unmount
        return () => {
            if (to) {
                clearTimeout(to)
            }
        };
    }, []);

    return (
        <Display when={open}>
            <section className="dialog-back-drop">
                <fieldset className="dialog">
                    <div className="progress">
                        <div className="progress-bar" ref={progressRef}></div>
                    </div>
                    <p>{text}</p>
                </fieldset>
            </section>
        </Display>
    );
};

export default Loader;