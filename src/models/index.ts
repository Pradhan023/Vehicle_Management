export interface Vehicle {
  id?: number;
  make: string;
  model: string;
  year: number;
  owner_id: number;
  registration_id: number;
}

export interface Owner {
  id?: number;
  name: string;
}

export interface Registration {
  id?: number;
  plate_number: string;
  state: string;
}
