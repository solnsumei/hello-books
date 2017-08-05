export function adminMiddleware(req, res, next){
    if(!req.decode.user.isAdmin){
        return res.status(403).send({error: 'Access denied'})
    }
    next();
}