import sql from "./db.js"
const withSearch = (search) => sql`where title ilike ${'%' + search + '%'}`;
const withStatusAndPriority = (status, priority) => sql`where status = ${status} and priority=${priority}`;
const withStatus = (status) => sql`where status = ${status}`;
const withPriority = (priority) => sql`where priority=${priority}`;

export const taskService = {
    async addTask({ title, description, status, priority, created_at }) {
        const [task] = await sql`
                insert into tasks (
                    title, 
                    description, 
                    status, 
                    priority,
                    created_at
                ) values (
                    ${title}, ${description}, ${status}, ${priority}, ${created_at}
                )

                returning *
            `
        return task;
    },
    async findById(taskId) {
        const [task] = await sql`
                    select
                    *
                    from tasks
                    where id = ${taskId}
                `
        return task;
    },
    async findAll({ search, status, priority }) {
        const tasks = await sql`
                    select
                    id, 
                    title, 
                    description, 
                    status, 
                    priority, 
                    created_at, 
                    completed_at
                    from tasks 
                    ${search ? withSearch(search)
                :
                status && priority ? withStatusAndPriority(status, priority)
                    :
                    status ? withStatus(status)
                        : priority ? withPriority(priority) : sql``
            }
                    order by id desc
                `;

        return tasks
    },

    async getStats() {
        const [stat] = await sql`
            select 
            (select COUNT(t.id) from tasks t) as total_tasks,
            (select COUNT(t.id) from tasks t where t.status = 'todo') as todo_tasks,
            (select COUNT(t.id) from tasks t where t.status = 'done') as completed_tasks,
            (select COUNT(t.id) from tasks t where t.status = 'in-progress') as progress_tasks,
            (select COUNT(t.id) from tasks t where t.priority = 'low') as low_tasks,
            (select COUNT(t.id) from tasks t where t.priority = 'medium') as medium_tasks,
            (select COUNT(t.id) from tasks t where t.priority = 'high') as high_tasks,
            (select COUNT(t.id) from tasks t where t.status != 'done') as pending_tasks,
            (select ROUND(AVG(EXTRACT(EPOCH FROM(t.completed_at - t.created_at))), 2) from tasks t where t.status = 'done') as average_time_seconds
        `
        return stat
    },
    async updateTask(task) {
        await sql`
                update tasks set ${sql(task, 'title', 'description', 'status', 'priority', 'created_at', 'completed_at')}
                where id = ${task.id}
        `
    },

    async deleteTask(id) {
        await sql`
                delete from tasks where id = ${id}
        `
    }

};
