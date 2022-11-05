import { Method } from './method';

export const PROGRAM_CHANGE_COMMAND_TOPIC = 'hobby/control/devices/cmd';
export const ProgramChangeCommand = (uuid: string, program: string) => ({
  topic: PROGRAM_CHANGE_COMMAND_TOPIC,
  data: {
    Method: Method.DEVICES_CONTROL,
    Params: [
      {
        Devices: [
          {
            Uuid: uuid,
            Properties: [
              {
                Program: program,
              },
            ],
          },
        ],
      },
    ],
  },
});
