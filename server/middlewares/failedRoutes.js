/**
 * Middleware to catch all non existing routes
 * @export
 * @param {Object} req 
 * @param {Object} res
 * 
 * @returns {Object} res
 */
export default function failedRoutes(req, res) {
  return res.status(404).send({
    error: 'Route not found'
  });
}
