export const randomString = () => {
    return String(Date.now() + Math.floor(Math.random() * 1E9))
}
