import { ExecutionContext } from '@nestjs/common';

export type AuthContext = ExecutionContext & {
  userId: string;
  req?: Request;
};

type JWTPayload = {
  sub: string;
  iat: number;
};

export const isJWTPayload = (payload: any): payload is JWTPayload =>
  typeof payload === 'object' &&
  typeof payload.sub === 'string' &&
  typeof payload.iat === 'number';
