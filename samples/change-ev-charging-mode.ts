import { NHC2 } from '../src/NHC2';
import { ChargingMode } from '../src/event/ChargingMode';

const nhc2 = new NHC2('mqtts://192.168.0.216', {
    port: 8884,
    clientId: 'clientId',
    username: 'hobby',
    password: 'password',
    rejectUnauthorized: false,
});

(async () => {
    await nhc2.subscribe();

    nhc2.sendChargingModeChangeCommand('charging-station-uuid', ChargingMode.Normal);
})();

