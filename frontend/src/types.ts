export type Task = {
    id?: number;
    title: string;
    description: string;
    status: "todo" | "in-progress" | "done";
    priority: "low" | "medium" | "high";
    created_at?: string;
    completed_at?: string;
}

export type StatData = {
    total_tasks: number;
    todo_tasks: number;
    completed_tasks: number;
    low_tasks: number;
    medium_tasks: number;
    high_tasks: number;
    progress_tasks: number;
    pending_tasks: number;
    average_time_seconds: number;
}
export type Params = Record<string, any>;

export type LoginParams = { userId: string; password: string; }

export type ChartData = {
    title: string;
    labels: string[];
    data: number[];
}

// export type Filter = {
//     status?: string;
//     priority?: string;
// }

