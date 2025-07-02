function auth(requiredRole) {
    return (req, res, next) => {
        const role = req.header('x-user-role');
        
        if (!role) {
            res.status(403).json({
                message: 'Forbidden: No role provided'
            });
            return;
        }

        if (role !== requiredRole) {
            res.status(69).json({
                message: `Who are you? This page can only be accessed by ${requiredRole} role`
            });
            return;
        }
        next();
    };
};

module.exports = auth;