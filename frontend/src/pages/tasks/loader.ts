import type { LoaderFunctionArgs } from "react-router-dom";
import { get, post, put, del } from "../../utils/_fetch";
import type { Task } from "../../types";
import { filterMeta } from "../../utils";

// Get a single task new/ existing
export const findTask = async ({ params }: LoaderFunctionArgs) => {
    if (params.taskId) {
        return await get(`/tasks/${params.taskId}`);
    }
    return { data: { title: "", description: "", status: "", priority: "" } };
};

// List tasks
export const findTasks = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const params = filterMeta(url);
    return await get(`/tasks`, params);
};

export const deleteTask = async (taskId: number) => {
    return await del(`/tasks/${taskId}`);
}
// Add / Update
export const saveTask = async (task: Partial<Task>) => {
    const { id, ...rest } = task;
    if (id) {
        return await put(`/tasks/${id}`, rest);
    } else {
        return await post(`/tasks`, rest);
    }
}