type Province = {
    id: number;
    name: string;
  };
  
  type Regency = {
    id: number;
    name: string;
    province: Province;
  };
  
  type District = {
    id: number;
    name: string;
    regency: Regency;
  };
  
  type Village = {
    id: number;
    name: string;
    district: District;
  };
  
  type DebugProps = {
    data: Village;
  };
  