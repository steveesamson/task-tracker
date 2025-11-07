import { post } from "../../utils/_fetch";
import type { LoginParams } from "../../types";

export const login = async (params: LoginParams) => {
    return await post("/users/login", params);
}