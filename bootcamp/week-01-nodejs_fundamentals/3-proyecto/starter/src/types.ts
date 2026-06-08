export interface MoveService {
  id: string;
  name: string;
  category: string;
  price: number;
  estimatedHours: number;
  active: boolean;
}

export interface MoveServiceSummary {
  total: number;
  active: number;
  inactive: number;
  averagePrice: number;
  mostExpensive: MoveService;
  cheapest: MoveService;
  categories: string[];
}

export interface Report {
  generatedAt: string;
  appliedFilter: string | null;
  summary: MoveServiceSummary;
  items: MoveService[];
}
