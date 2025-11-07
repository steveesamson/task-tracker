import { type FC } from "react";
import Display from "./display-when";
import "./dialog.css";

type PromptProps = {
    text: string;
    title: string;
    open: boolean;
    onYes: () => void;
    onNo: () => void;
}
// Prompt/Confirm
const Prompt: FC<PromptProps> = ({
    text,
    title = "Confirm",
    open = false,
    onYes,
    onNo,
}) => {
    return (
        <Display when={open}>
            <section className="dialog-back-drop">
                <fieldset className="prompt">
                    <h1>{title}</h1>
                    <p>{text}</p>
                    <div className="submit columns prompt-buttons">
                        <button className="primary" type="button" onClick={onYes}>
                            Yes
                        </button>
                        <button className="secondary" type="button" onClick={onNo}>
                            No
                        </button>
                    </div>
                </fieldset>
            </section>
        </Display>
    );
};

export default Prompt;
