export function adminMiddleware(req, res, next){
  if(!req.auth.user.admin){
    return res.status(403).send({error: 'Access denied'})
  }
  next();
}