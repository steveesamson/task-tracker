import type { Params } from "../types";

const EMAIL = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
const POSTAL_CODE = /^[A-Z][0-9][A-Z]\s[0-9][A-Z][0-9]$/;
const URL = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

// Validators
export const isEmail = (input?: string) => input?.match(EMAIL);
export const isURL = (input?: string) => input?.match(URL);
export const isPostalCode = (input?: string) => input?.match(POSTAL_CODE);
export const isEmpty = (value?: string) => value?.trim().length === 0;

export const filterMeta = (url: URL): Params => {
    const search = url.searchParams.get("search") || "";
    const priority = url.searchParams.get("priority") || "";
    const status = url.searchParams.get("status") || "";
    const param: Params = {};
    if (search) {
        param.search = search;
    }
    if (priority) {
        param.priority = priority;
    }
    if (status) {
        param.status = status;
    }
    return param;
}
export const formatDate = (date?: string | Date) => {
    if (!date) return;
    let _date: Date;
    if (typeof date === 'string') {
        _date = new Date(date);
    } else {
        _date = date;
    }
    let hours = _date.getHours();
    const minutes = _date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const _minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + _minutes + ' ' + ampm;
    return (_date.getMonth() + 1) + "/" + _date.getDate() + "/" + _date.getFullYear() + "  " + strTime;
}

function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
        const context = this;
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}
export { debounce }