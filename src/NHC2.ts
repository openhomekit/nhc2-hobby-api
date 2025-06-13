import * as mqtt from 'mqtt';
import { IClientOptions } from 'mqtt';
import { Observable, Subject } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { BrightnessChangeCommand } from './command/brightness-change-command';
import { Command } from './command/command';
import { BoostChangeCommand } from './command/boost-change-command';
import { ChargingModeChangeCommand } from './command/charging-mode-change-command';
import { FanSpeedChangeCommand } from './command/fan-speed-change-command';
import { isListDevicesEvent, ListDevicesCommand } from './command/list-devices-command';
import { OverruleTemperatureCommand } from './command/overrule-temperature-command';
import { PositionChangeCommand } from './command/position-change-command';
import { ProgramChangeCommand } from './command/program-command';
import { StatusChangeCommand } from './command/status-change-command';
import { TriggerBasicStateCommand } from './command/trigger-basic-state-command';
import { Device } from './event/device';
import { Event } from './event/event';
import { FanSpeed } from './event/FanSpeed';
import { Program } from './event/Program';
import { ChargingMode } from './event/ChargingMode';

export class NHC2 {
  public readonly client: mqtt.MqttClient;

  private events = new Subject<Event>();

  constructor(brokerUrl: string, options: IClientOptions) {
    this.client = mqtt.connect(brokerUrl, options);
  }

  public close(): void {
    this.client.end();
  }

  public getEvents(): Observable<Event> {
    return this.events.asObservable();
  }

  public async getAccessories(): Promise<Device[]> {
    this.sendListDevicesCommand();

    return new Promise<any>(resolve => {
      return this.events
        .asObservable()
        .pipe(
          filter(event => isListDevicesEvent(event)),
          flatMap(event => event.Params),
          map(params => params.Devices),
        )
        .subscribe(devices => {
          resolve(devices.filter(device => device.Online === 'True' && device.Type !== 'gatewayfw'));
        });
    });
  }

  public sendListDevicesCommand() {
    this.sendCommand(ListDevicesCommand());
  }

  public sendStatusChangeCommand(deviceUuid: string, state: boolean) {
    this.sendCommand(StatusChangeCommand(deviceUuid, state ? 'On' : 'Off'));
  }

  public sendBrightnessChangeCommand(deviceUuid: string, brightness: number) {
    this.sendCommand(BrightnessChangeCommand(deviceUuid, String(brightness)));
  }

  public sendPositionChangeCommand(deviceUuid: string, position: number) {
    this.sendCommand(PositionChangeCommand(deviceUuid, String(position)));
  }

  public sendTriggerBasicStateCommand(deviceUuid: string) {
    this.sendCommand(TriggerBasicStateCommand(deviceUuid));
  }

  public sendFanSpeedCommand(deviceUuid: string, fanSpeed: FanSpeed) {
    this.sendCommand(FanSpeedChangeCommand(deviceUuid, fanSpeed));
  }

  public sendProgramCommand(deviceUuid: string, program: Program) {
    this.sendCommand(ProgramChangeCommand(deviceUuid, program));
  }

  public sendChargingModeChangeCommand(deviceUuid: string, chargingMode: ChargingMode) {
    this.sendCommand(ChargingModeChangeCommand(deviceUuid, chargingMode));
  }

  public sendBoostChangeCommand(deviceUuid: string, boost: boolean) {
    this.sendCommand(BoostChangeCommand(deviceUuid, boost ? 'On' : 'Off'));
  }

  public sendTempOverruleCommand(deviceUuid: string, active: boolean, setpoint: number, minutes?: number) {
    this.sendCommand(
      OverruleTemperatureCommand(
        deviceUuid,
        active ? 'true' : 'false',
        String(setpoint),
        minutes ? String(minutes) : undefined,
      ),
    );
  }

  public async subscribe() {
    return new Promise(resolve => {
      this.client
        .on('connect', () => {
          this.client.subscribe('hobby/control/devices/+', () => resolve(undefined)); // Wildcard subscription
        })
        .on('message', (topic: string, message: string) => {
          this.events.next(JSON.parse(message.toString()));
        });
    });
  }

  private sendCommand(command: Command) {
    this.client.publish(command.topic, JSON.stringify(command.data));
  }
}
