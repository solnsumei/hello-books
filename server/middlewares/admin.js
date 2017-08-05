export function adminMiddleware(req, res, next){
    if(!req.decoded.user.admin){
        return res.status(403).send({error: 'Access denied'})
    }
    next();
}