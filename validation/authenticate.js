const isAuthenticated = (req, res, next) => {
    if (req.session?.user === undefined) {
        const btn = '<a href="/api/auth/github"><button>GitHub OAuth 2.0</button></a>';
        return res.send(`Unauthorized. Please login. <br/><br/> ${btn}`);
    }
    next();
};

module.exports = { isAuthenticated };