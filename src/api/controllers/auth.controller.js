const register = async(req, res) => {
    try {
        res.status(200).json({
            message: "ok"
        })
    } catch (e) {
        console.log(e);
    }
}

const login = async(req, res) => {
    try {res.status(200).json({
            message: "ok login"
        })
    } catch (e) {
        console.log(e);
    }
}

export {
    register,
    login
}