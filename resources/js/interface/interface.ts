export type Province = {
    id: number;
    name: string;
  };
  
export type Regency = {
  id: number;
  name: string;
  province: Province;
};

export type District = {
  id: number;
  name: string;
  regency: Regency;
};

export type Village = {
  id: number;
  name: string;
  district: District;
};

export type DebugProps = {
  data: Village;
};
  