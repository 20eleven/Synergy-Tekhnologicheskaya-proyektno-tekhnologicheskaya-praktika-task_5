export interface User {
  id: string;
  username: string;
}

export interface Travel {
  id: string;
  userId: string;
  username: string;
  cost: number;
  places: string[];
  mobility: number;
  safety: number;
  population: number;
  vegetation: number;
}
