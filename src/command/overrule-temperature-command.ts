import { Method } from './method';

export const OVERRULE_TEMPERATURE_COMMAND_TOPIC = 'hobby/control/devices/cmd';
export const OverruleTemperatureCommand = (uuid: string, active: string, setpoint: string, minutes?: string) => ({
  topic: OVERRULE_TEMPERATURE_COMMAND_TOPIC,
  data: {
    Method: Method.DEVICES_CONTROL,
    Params: [
      {
        Devices: [
          {
            Uuid: uuid,
            Properties: [
              {
                OverruleActive: active,
                OverruleSetpoint: setpoint,
                OverruleTime: minutes,
              },
            ],
          },
        ],
      },
    ],
  },
});
