/**
 * Middleware to restrict access based on user roles
 * Must be used AFTER authenticate middleware
 */

/**
 * Check if user has one of the allowed roles
 * @param  {...string} allowedRoles - Array of allowed roles
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    // Check if user's role is in allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role(s): ${allowedRoles.join(', ')}. Your role: ${req.user.role}.`,
      });
    }

    next();
  };
};

/**
 * Middleware for employer-only routes
 */
export const requireEmployer = requireRole('employer');

/**
 * Middleware for job seeker-only routes
 */
export const requireJobSeeker = requireRole('jobseeker');

/**
 * Middleware for training provider-only routes
 */
export const requireTrainingProvider = requireRole('trainingProvider');

/**
 * Middleware for admin-only routes (if implementing admin features)
 */
export const requireAdmin = requireRole('admin');

/**
 * Middleware that allows multiple roles
 */
export const requireAnyRole = (...roles) => requireRole(...roles);
