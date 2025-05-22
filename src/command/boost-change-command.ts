import { Method } from './method';

export const BOOST_CHANGE_COMMAND_TOPIC = 'hobby/control/devices/cmd';
export const BoostChangeCommand = (uuid: string, boost: string) => ({
  topic: BOOST_CHANGE_COMMAND_TOPIC,
  data: {
    Method: Method.DEVICES_CONTROL,
    Params: [
      {
        Devices: [
          {
            Uuid: uuid,
            Properties: [
              {
                Boost: boost,
              },
            ],
          },
        ],
      },
    ],
  },
});
