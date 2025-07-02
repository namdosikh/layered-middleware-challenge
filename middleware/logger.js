function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next(); // This lets the request continue to the next middleware or route
}

module.exports = logger;