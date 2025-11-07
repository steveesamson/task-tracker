import { useEffect, useRef, type FC } from "react";
import Display from "./display-when";
import "./dialog.css";

type ProgressProps = {
  text: string;
  open: boolean;
  percent: number;
}
// Progress bar
const Progress: FC<ProgressProps> = ({ text, open = false, percent = 0 }) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current: progress } = progressRef;
    if (progress) {
      progress.style.width = `${percent}%`;
    }
  }, [percent]);

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

export default Progress;