import { Demand } from './Demand';
import { FanSpeed } from './FanSpeed';
import { Program } from './Program';

export interface Property {
  Brightness?: string;
  Status?: string;
  Position?: string;
  BasicState?: string;
  FanSpeed?: FanSpeed;
  Moving?: string;
  OverruleActive?: string;
  OverruleSetpoint?: string;
  OverruleTime?: string;
  AmbientTemperature?: string;
  SetpointTemperature?: string;
  Demand?: Demand;
  Program?: Program;
}
