import { get } from "../../utils/_fetch";

export const findStats = async () => {
    return await get(`/tasks/stats`);
};

