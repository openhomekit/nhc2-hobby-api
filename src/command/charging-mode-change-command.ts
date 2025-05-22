import { Method } from './method';

export const CHARGING_MODE_CHANGE_COMMAND_TOPIC = 'hobby/control/devices/cmd';
export const ChargingModeChangeCommand = (uuid: string, mode: string) => ({
  topic: CHARGING_MODE_CHANGE_COMMAND_TOPIC,
  data: {
    Method: Method.DEVICES_CONTROL,
    Params: [
      {
        Devices: [
          {
            Uuid: uuid,
            Properties: [
              {
                ChargingMode: mode,
              },
            ],
          },
        ],
      },
    ],
  },
});
