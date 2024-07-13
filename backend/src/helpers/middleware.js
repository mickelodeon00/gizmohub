import { decodeToken, handleResponse } from './util.js';

class AuthCheck {
  static async checkAuthStatus(req, res, next) {
    const headerBearer = req.headers.authorization;
    if (headerBearer) {
      const bearer = headerBearer.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      req.user = decodeToken(bearerToken);
      next();
      return;
    }
    handleResponse(res, 403, 'Unauthorized Action, please register or login');
  }

  static async checkToken(req, res, next) {
    const decodedToken = decodeToken(req.token);
    if (!decodedToken || decodedToken?.expiresAt <= Date.now()) {
      return handleResponse(res, 401, 'Token Expired! Please re-login');
    }
    next();
  }

  static async authorizeRole(req, res, next, ...acceptedRoles) {
    if (!acceptedRoles.includes(req.user?.role)) {
      return handleResponse(
        res,
        403,
        'Unauthorized Action, please signup as a vendor'
      );
    }
    next();
  }

  static authorize(...roles) {
    return (req, res, next) => {
      AuthCheck.authorizeRole(req, res, next, ...roles);
    };
  }
}

export default AuthCheck;
