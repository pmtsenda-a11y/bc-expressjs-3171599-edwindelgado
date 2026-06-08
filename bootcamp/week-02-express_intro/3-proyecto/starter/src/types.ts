export interface MoveService {
  id: number;
  name: string;
  category: string;
  price: number;
  estimatedHours: number;
  active: boolean;
}

export type CreateMoveServiceDto = Omit<MoveService, 'id'>;

export type UpdateMoveServiceDto = Partial<CreateMoveServiceDto>;
