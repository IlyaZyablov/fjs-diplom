import { ID } from '../../../infrastructure/global';

export interface SearchRoomParamsDto {
  hotel: ID;
  limit?: number;
  offset?: number;
  isEnabled?: string;
}
