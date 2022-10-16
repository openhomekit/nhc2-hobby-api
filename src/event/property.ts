import { Demand } from './Demand';
import { FanSpeed } from './FanSpeed';

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
}
