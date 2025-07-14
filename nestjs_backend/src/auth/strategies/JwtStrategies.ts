import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import constants from '../../shared/security/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constants.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // Este objeto será accesible como req.user en controladores protegidos
    return {
      id: payload.sub,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
