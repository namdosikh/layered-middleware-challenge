function validateBody(requiredKeys) {
    return (req, res, next) => {
        const body = req.body;

        if (!body || typeof body !== 'object') {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        for (const key of requiredKeys) {
            if (!body.hasOwnProperty(key)) {
                return res.status(400).json({ error: `Missing required field: ${key}` });
            }
        }

        next();
    }
};

module.exports = validateBody;