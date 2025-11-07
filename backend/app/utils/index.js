export const deriveErrorMessage = (error) => {
    return error instanceof Error ? error.message : error.toString();
}