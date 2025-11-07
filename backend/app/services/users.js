import sql from "./db.js"

export const userService = {

    async findByUserId(userId) {
        const [user] = await sql`
                    select
                    id, 
                    user_id,
                    password
                    from users
                    where user_id = ${userId}
                `
        return user
    },
    async addUser({ userId, password }) {
        const [user] = await sql`
                insert into users (
                    user_id, 
                    password
                ) values (
                    ${userId}, ${password}
                )

                returning *
            `
        return user;
    },

};
