import fz from '../converters/fromZigbee';
import tz from '../converters/toZigbee';
import * as exposes from '../lib/exposes';
import * as m from '../lib/modernExtend';
import * as reporting from '../lib/reporting';
import {Configure, DefinitionWithExtend, Expose, Fz, ModernExtend, Tz} from '../lib/types';

const e = exposes.presets;
const ea = exposes.access;

const adurosmartManufacturerCode = 0x122d;

function adurosmartDimmerLoadControlMode(): ModernExtend {
    const attribute = 0x7600;
    const data_type = 0x20;
    const value_map: {[key: number]: string} = {
        0: 'leading_edge_control',
        1: 'trailing_edge_control',
    };
    const value_lookup: {[key: string]: number} = {
        leading_edge_control: 0,
        trailing_edge_control: 1,
    };

    const fromZigbee: Fz.Converter[] = [
        {
            cluster: 'genBasic',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                if (Object.prototype.hasOwnProperty.call(msg.data, attribute)) {
                    const value = msg.data[attribute];
                    return {
                        dimmer_load_control_mode: value_map[value] || 'unknown',
                        dimmer_load_control_mode_numeric: value,
                    };
                }
                return undefined;
            },
        } satisfies Fz.Converter,
    ];

    const toZigbee: Tz.Converter[] = [
        {
            key: ['dimmer_load_control_mode'],
            convertSet: async (entity, key, value: string, meta) => {
                const numericValue = value_lookup[value] ?? parseInt(value, 10);
                await entity.write('genBasic', {[attribute]: {value: numericValue, type: data_type}}, {manufacturerCode: adurosmartManufacturerCode});
                return {state: {dimmer_load_control_mode: value}};
            },
            convertGet: async (entity, key, meta) => {
                await entity.read('genBasic', [attribute], {manufacturerCode: adurosmartManufacturerCode});
            },
        } satisfies Tz.Converter,
    ];

    const exposes: Expose[] = [
        e.enum('dimmer_load_control_mode', ea.ALL, ['leading_edge_control', 'trailing_edge_control']).withLabel('Load Control Mode'),
    ];

    const configure: [Configure] = [
        async (device, coordinatorEndpoint, definition) => {
            const endpoint = device.getEndpoint(1);
            try {
                await endpoint.read('genBasic', [attribute], {manufacturerCode: adurosmartManufacturerCode});
            } catch (error) {
                console.warn(`Failed to read dimmer load control mode attribute: ${error}`);
            }
        },
    ];

    return {
        fromZigbee,
        toZigbee,
        exposes,
        configure,
        isModernExtend: true,
    };
}

function adurosmartDimmerSwitchMode(): ModernExtend {
    const attribute = 0x7700;
    const data_type = 0x20;
    const value_map: {[key: number]: string} = {
        0: 'momentary_switch',
        1: 'toggle_switch',
        2: 'roller_blind_switch',
    };
    const value_lookup: {[key: string]: number} = {
        momentary_switch: 0,
        toggle_switch: 1,
        roller_blind_switch: 2,
    };

    const fromZigbee: Fz.Converter[] = [
        {
            cluster: 'genBasic',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                if (Object.prototype.hasOwnProperty.call(msg.data, attribute)) {
                    const value = msg.data[attribute];
                    return {
                        dimmer_switch_mode: value_map[value] || 'unknown',
                        dimmer_switch_mode_numeric: value,
                    };
                }
                return undefined;
            },
        } satisfies Fz.Converter,
    ];

    const toZigbee: Tz.Converter[] = [
        {
            key: ['dimmer_switch_mode'],
            convertSet: async (entity, key, value: string, meta) => {
                const numericValue = value_lookup[value] ?? parseInt(value, 10);
                await entity.write('genBasic', {[attribute]: {value: numericValue, type: data_type}}, {manufacturerCode: adurosmartManufacturerCode});
                return {state: {dimmer_switch_mode: value}};
            },
            convertGet: async (entity, key, meta) => {
                await entity.read('genBasic', [attribute], {manufacturerCode: adurosmartManufacturerCode});
            },
        } satisfies Tz.Converter,
    ];

    const exposes: Expose[] = [
        e.enum('dimmer_switch_mode', ea.ALL, ['momentary_switch', 'toggle_switch', 'roller_blind_switch']).withLabel('Switch Mode'),
    ];

    const configure: [Configure] = [
        async (device, coordinatorEndpoint, definition) => {
            const endpoint = device.getEndpoint(1);
            try {
                await endpoint.read('genBasic', [attribute], {manufacturerCode: adurosmartManufacturerCode});
            } catch (error) {
                console.warn(`Failed to read dimmer switch mode attribute: ${error}`);
            }
        },
    ];

    return {
        fromZigbee,
        toZigbee,
        exposes,
        configure,
        isModernExtend: true,
    };
}

function adurosmartDimmerInvertSwitch(): ModernExtend {
    const attribute = 0x7701;
    const data_type = 0x10;
    const value_map: {[key: number]: string} = {
        0: 'disabled',
        1: 'enabled',
    };
    const value_lookup: {[key: string]: number} = {
        disabled: 0,
        enabled: 1,
    };

    const fromZigbee: Fz.Converter[] = [
        {
            cluster: 'genBasic',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                if (Object.prototype.hasOwnProperty.call(msg.data, attribute)) {
                    const value = msg.data[attribute];
                    return {
                        dimmer_invert_switch: value_map[value] || 'unknown',
                        dimmer_invert_switch_numeric: value,
                    };
                }
                return undefined;
            },
        } satisfies Fz.Converter,
    ];

    const toZigbee: Tz.Converter[] = [
        {
            key: ['dimmer_invert_switch'],
            convertSet: async (entity, key, value: string, meta) => {
                const numericValue = value_lookup[value] ?? parseInt(value, 10);
                await entity.write('genBasic', {[attribute]: {value: numericValue, type: data_type}}, {manufacturerCode: adurosmartManufacturerCode});
                return {state: {dimmer_invert_switch: value}};
            },
        } satisfies Tz.Converter,
    ];

    const exposes: Expose[] = [e.enum('dimmer_invert_switch', ea.STATE_SET, ['disabled', 'enabled']).withLabel('Invert Switch')];

    const configure: [Configure] = [
        async (device, coordinatorEndpoint, definition) => {
            const endpoint = device.getEndpoint(1);
            try {
                await endpoint.read('genBasic', [attribute], {manufacturerCode: adurosmartManufacturerCode});
            } catch (error) {
                console.warn(`Failed to read dimmer invert switch attribute: ${error}`);
            }
        },
    ];

    return {
        fromZigbee,
        toZigbee,
        exposes,
        configure,
        isModernExtend: true,
    };
}

function adurosmartDimmerSceneActivation(): ModernExtend {
    const attribute = 0x7702;
    const data_type = 0x10;
    const value_map: {[key: number]: string} = {
        0: 'disabled',
        1: 'enabled',
    };
    const value_lookup: {[key: string]: number} = {
        disabled: 0,
        enabled: 1,
    };

    const fromZigbee: Fz.Converter[] = [
        {
            cluster: 'genBasic',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                if (Object.prototype.hasOwnProperty.call(msg.data, attribute)) {
                    const value = msg.data[attribute];
                    return {
                        dimmer_scene_activation: value_map[value] || 'unknown',
                        dimmer_scene_activation_numeric: value,
                    };
                }
                return undefined;
            },
        } satisfies Fz.Converter,
    ];

    const toZigbee: Tz.Converter[] = [
        {
            key: ['dimmer_scene_activation'],
            convertSet: async (entity, key, value: string, meta) => {
                const numericValue = value_lookup[value] ?? parseInt(value, 10);
                await entity.write('genBasic', {[attribute]: {value: numericValue, type: data_type}}, {manufacturerCode: adurosmartManufacturerCode});
                return {state: {dimmer_scene_activation: value}};
            },
        } satisfies Tz.Converter,
    ];

    const exposes: Expose[] = [e.enum('dimmer_scene_activation', ea.STATE_SET, ['disabled', 'enabled']).withLabel('Scene Activation')];

    const configure: [Configure] = [
        async (device, coordinatorEndpoint, definition) => {
            const endpoint = device.getEndpoint(1);
            try {
                await endpoint.read('genBasic', [attribute], {manufacturerCode: adurosmartManufacturerCode});
            } catch (error) {
                console.warn(`Failed to read dimmer scene activation attribute: ${error}`);
            }
        },
    ];

    return {
        fromZigbee,
        toZigbee,
        exposes,
        configure,
        isModernExtend: true,
    };
}

function adurosmartDimmerS1DoubleClickScene(): ModernExtend {
    const attribute = 0x7703;
    const data_type = 0x20;
    const value_map: {[key: number]: string} = {
        0: 'null',
        1: 'on',
        2: 'off',
        3: 'dimming_up',
        4: 'dimming_down',
        5: 'dimming_to_brightest',
        6: 'dimming_to_darkest',
    };
    const value_lookup: {[key: string]: number} = {
        null: 0,
        on: 1,
        off: 2,
        dimming_up: 3,
        dimming_down: 4,
        dimming_to_brightest: 5,
        dimming_to_darkest: 6,
    };

    const fromZigbee: Fz.Converter[] = [
        {
            cluster: 'genBasic',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                if (Object.prototype.hasOwnProperty.call(msg.data, attribute)) {
                    const value = msg.data[attribute];
                    return {
                        dimmer_s1_double_click_scene: value_map[value] || 'unknown',
                        dimmer_s1_double_click_scene_numeric: value,
                    };
                }
                return undefined;
            },
        } satisfies Fz.Converter,
    ];

    const toZigbee: Tz.Converter[] = [
        {
            key: ['dimmer_s1_double_click_scene'],
            convertSet: async (entity, key, value: string, meta) => {
                const numericValue = value_lookup[value] ?? parseInt(value, 10);
                await entity.write('genBasic', {[attribute]: {value: numericValue, type: data_type}}, {manufacturerCode: adurosmartManufacturerCode});
                return {state: {dimmer_s1_double_click_scene: value}};
            },
        } satisfies Tz.Converter,
    ];

    const exposes: Expose[] = [
        e
            .enum('dimmer_s1_double_click_scene', ea.STATE_SET, [
                'null',
                'on',
                'off',
                'dimming_up',
                'dimming_down',
                'dimming_to_brightest',
                'dimming_to_darkest',
            ])
            .withLabel('S1 Double Click Scene'),
    ];

    const configure: [Configure] = [
        async (device, coordinatorEndpoint, definition) => {
            const endpoint = device.getEndpoint(1);
            try {
                await endpoint.read('genBasic', [attribute], {manufacturerCode: adurosmartManufacturerCode});
            } catch (error) {
                console.warn(`Failed to read dimmer s1 double click scene attribute: ${error}`);
            }
        },
    ];

    return {
        fromZigbee,
        toZigbee,
        exposes,
        configure,
        isModernExtend: true,
    };
}

function adurosmartDimmerS2DoubleClickScene(): ModernExtend {
    const attribute = 0x7704;
    const data_type = 0x20;
    const value_map: {[key: number]: string} = {
        0: 'null',
        1: 'on',
        2: 'off',
        3: 'dimming_up',
        4: 'dimming_down',
        5: 'dimming_to_brightest',
        6: 'dimming_to_darkest',
    };
    const value_lookup: {[key: string]: number} = {
        null: 0,
        on: 1,
        off: 2,
        dimming_up: 3,
        dimming_down: 4,
        dimming_to_brightest: 5,
        dimming_to_darkest: 6,
    };

    const fromZigbee: Fz.Converter[] = [
        {
            cluster: 'genBasic',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                if (Object.prototype.hasOwnProperty.call(msg.data, attribute)) {
                    const value = msg.data[attribute];
                    return {
                        dimmer_s2_double_click_scene: value_map[value] || 'unknown',
                        dimmer_s2_double_click_scene_numeric: value,
                    };
                }
                return undefined;
            },
        } satisfies Fz.Converter,
    ];

    const toZigbee: Tz.Converter[] = [
        {
            key: ['dimmer_s2_double_click_scene'],
            convertSet: async (entity, key, value: string, meta) => {
                const numericValue = value_lookup[value] ?? parseInt(value, 10);
                await entity.write('genBasic', {[attribute]: {value: numericValue, type: data_type}}, {manufacturerCode: adurosmartManufacturerCode});
                return {state: {dimmer_s2_double_click_scene: value}};
            },
        } satisfies Tz.Converter,
    ];

    const exposes: Expose[] = [
        e
            .enum('dimmer_s2_double_click_scene', ea.STATE_SET, [
                'null',
                'on',
                'off',
                'dimming_up',
                'dimming_down',
                'dimming_to_brightest',
                'dimming_to_darkest',
            ])
            .withLabel('S2 Double Click Scene'),
    ];

    const configure: [Configure] = [
        async (device, coordinatorEndpoint, definition) => {
            const endpoint = device.getEndpoint(1);
            try {
                await endpoint.read('genBasic', [attribute], {manufacturerCode: adurosmartManufacturerCode});
            } catch (error) {
                console.warn(`Failed to read dimmer s2 double click scene attribute: ${error}`);
            }
        },
    ];

    return {
        fromZigbee,
        toZigbee,
        exposes,
        configure,
        isModernExtend: true,
    };
}

function adurosmartDimmerMinBrightnessLevel(): ModernExtend {
    const attribute = 0x7800;
    const data_type = 0x20;

    const fromZigbee: Fz.Converter[] = [
        {
            cluster: 'genBasic',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                if (Object.prototype.hasOwnProperty.call(msg.data, attribute)) {
                    const value = msg.data[attribute];
                    return {
                        dimmer_min_brightness_level_numeric: value,
                    };
                }
                return undefined;
            },
        } satisfies Fz.Converter,
    ];

    const toZigbee: Tz.Converter[] = [
        {
            key: ['dimmer_min_brightness_level'],
            convertSet: async (entity, key, value: string, meta) => {
                const numericValue = value;
                await entity.write('genBasic', {[attribute]: {value: numericValue, type: data_type}}, {manufacturerCode: adurosmartManufacturerCode});
                return {state: {dimmer_min_brightness_level: value}};
            },
        } satisfies Tz.Converter,
    ];

    const exposes: Expose[] = [
        e.numeric('dimmer_min_brightness_level', ea.STATE_SET).withValueMin(1).withValueMax(100).withValueStep(1).withLabel('Min Brightness Level'),
    ];

    const configure: [Configure] = [
        async (device, coordinatorEndpoint, definition) => {
            const endpoint = device.getEndpoint(1);
            try {
                await endpoint.read('genBasic', [attribute], {manufacturerCode: adurosmartManufacturerCode});
            } catch (error) {
                console.warn(`Failed to read dimmer min brightness level attribute: ${error}`);
            }
        },
    ];

    return {
        fromZigbee,
        toZigbee,
        exposes,
        configure,
        isModernExtend: true,
    };
}

function adurosmartDimmerMaxBrightnessLevel(): ModernExtend {
    const attribute = 0x7801;
    const data_type = 0x20;

    const fromZigbee: Fz.Converter[] = [
        {
            cluster: 'genBasic',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                if (Object.prototype.hasOwnProperty.call(msg.data, attribute)) {
                    const value = msg.data[attribute];
                    return {
                        dimmer_max_brightness_level_numeric: value,
                    };
                }
                return undefined;
            },
        } satisfies Fz.Converter,
    ];

    const toZigbee: Tz.Converter[] = [
        {
            key: ['dimmer_max_brightness_level'],
            convertSet: async (entity, key, value: string, meta) => {
                const numericValue = value;
                await entity.write('genBasic', {[attribute]: {value: numericValue, type: data_type}}, {manufacturerCode: adurosmartManufacturerCode});
                return {state: {dimmer_max_brightness_level: value}};
            },
        } satisfies Tz.Converter,
    ];

    const exposes: Expose[] = [
        e.numeric('dimmer_max_brightness_level', ea.STATE_SET).withValueMin(1).withValueMax(100).withValueStep(1).withLabel('Max Brightness Level'),
    ];

    const configure: [Configure] = [
        async (device, coordinatorEndpoint, definition) => {
            const endpoint = device.getEndpoint(1);
            try {
                await endpoint.read('genBasic', [attribute], {manufacturerCode: adurosmartManufacturerCode});
            } catch (error) {
                console.warn(`Failed to read dimmer max brightness level attribute: ${error}`);
            }
        },
    ];

    return {
        fromZigbee,
        toZigbee,
        exposes,
        configure,
        isModernExtend: true,
    };
}

function adurosmartDimmerManualDimmingStepSize(): ModernExtend {
    const attribute = 0x7802;
    const data_type = 0x20;

    const fromZigbee: Fz.Converter[] = [
        {
            cluster: 'genBasic',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                if (Object.prototype.hasOwnProperty.call(msg.data, attribute)) {
                    const value = msg.data[attribute];
                    return {
                        dimmer_manual_dimming_step_size_numeric: value,
                    };
                }
                return undefined;
            },
        } satisfies Fz.Converter,
    ];

    const toZigbee: Tz.Converter[] = [
        {
            key: ['dimmer_manual_dimming_step_size'],
            convertSet: async (entity, key, value: string, meta) => {
                const numericValue = value;
                await entity.write('genBasic', {[attribute]: {value: numericValue, type: data_type}}, {manufacturerCode: adurosmartManufacturerCode});
                return {state: {dimmer_manual_dimming_step_size: value}};
            },
        } satisfies Tz.Converter,
    ];

    const exposes: Expose[] = [
        e
            .numeric('dimmer_manual_dimming_step_size', ea.STATE_SET)
            .withValueMin(1)
            .withValueMax(25)
            .withValueStep(1)
            .withLabel('Manual Dimming Step Size'),
    ];

    const configure: [Configure] = [
        async (device, coordinatorEndpoint, definition) => {
            const endpoint = device.getEndpoint(1);
            try {
                await endpoint.read('genBasic', [attribute], {manufacturerCode: adurosmartManufacturerCode});
            } catch (error) {
                console.warn(`Failed to read dimmer manual dimming step size attribute: ${error}`);
            }
        },
    ];

    return {
        fromZigbee,
        toZigbee,
        exposes,
        configure,
        isModernExtend: true,
    };
}

function adurosmartDimmerManualDimmingTime(): ModernExtend {
    const attribute = 0x7803;
    const data_type = 0x21;

    const fromZigbee: Fz.Converter[] = [
        {
            cluster: 'genBasic',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                if (Object.prototype.hasOwnProperty.call(msg.data, attribute)) {
                    const value = msg.data[attribute];
                    return {
                        dimmer_manual_dimming_time_numeric: value,
                    };
                }
                return undefined;
            },
        } satisfies Fz.Converter,
    ];

    const toZigbee: Tz.Converter[] = [
        {
            key: ['dimmer_manual_dimming_time'],
            convertSet: async (entity, key, value: string, meta) => {
                const numericValue = value;
                await entity.write('genBasic', {[attribute]: {value: numericValue, type: data_type}}, {manufacturerCode: adurosmartManufacturerCode});
                return {state: {dimmer_manual_dimming_time: value}};
            },
        } satisfies Tz.Converter,
    ];

    const exposes: Expose[] = [
        e
            .numeric('dimmer_manual_dimming_time', ea.STATE_SET)
            .withUnit('ms')
            .withValueMin(100)
            .withValueMax(10000)
            .withValueStep(100)
            .withLabel('Manual Dimming Time'),
    ];

    const configure: [Configure] = [
        async (device, coordinatorEndpoint, definition) => {
            const endpoint = device.getEndpoint(1);
            try {
                await endpoint.read('genBasic', [attribute], {manufacturerCode: adurosmartManufacturerCode});
            } catch (error) {
                console.warn(`Failed to read dimmer manual dimming time attribute: ${error}`);
            }
        },
    ];

    return {
        fromZigbee,
        toZigbee,
        exposes,
        configure,
        isModernExtend: true,
    };
}

const definitions: DefinitionWithExtend[] = [
    {
        zigbeeModel: ['ADUROLIGHT_CSC'],
        model: '15090054',
        vendor: 'AduroSmart',
        description: 'Remote scene controller',
        fromZigbee: [fz.battery, fz.command_toggle, fz.command_recall],
        toZigbee: [],
        exposes: [e.battery(), e.action(['toggle', 'recall_253', 'recall_254', 'recall_255'])],
    },
    {
        zigbeeModel: ['AD-SmartPlug3001'],
        model: '81848',
        vendor: 'AduroSmart',
        description: 'ERIA smart plug (with power measurements)',
        fromZigbee: [fz.on_off, fz.electrical_measurement],
        toZigbee: [tz.on_off],
        exposes: [e.switch(), e.power(), e.current(), e.voltage()],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'haElectricalMeasurement']);
            await reporting.onOff(endpoint);
            await reporting.readEletricalMeasurementMultiplierDivisors(endpoint);
            await reporting.rmsVoltage(endpoint);
            await reporting.rmsCurrent(endpoint);
            await reporting.activePower(endpoint);
        },
    },
    {
        zigbeeModel: ['ZLL-ExtendedColo', 'ZLL-ExtendedColor'],
        model: '81809/81813',
        vendor: 'AduroSmart',
        description: 'ERIA colors and white shades smart light bulb A19/BR30',
        extend: [m.light({colorTemp: {range: undefined}, color: {applyRedFix: true}})],
        endpoint: (device) => {
            return {default: 2};
        },
    },
    {
        zigbeeModel: ['AD-RGBW3001'],
        model: '81809FBA',
        vendor: 'AduroSmart',
        description: 'ERIA colors and white shades smart light bulb A19/BR30',
        extend: [m.light({colorTemp: {range: [153, 500]}, color: {modes: ['xy', 'hs'], applyRedFix: true}})],
    },
    {
        zigbeeModel: ['AD-E14RGBW3001'],
        model: '81895',
        vendor: 'AduroSmart',
        description: 'ERIA E14 Candle Color',
        extend: [m.light({colorTemp: {range: [153, 500]}, color: true})],
    },
    {
        zigbeeModel: ['AD-DimmableLight3001'],
        model: '81810',
        vendor: 'AduroSmart',
        description: 'Zigbee Aduro Eria B22 bulb - warm white',
        extend: [m.light()],
    },
    {
        zigbeeModel: ['Adurolight_NCC'],
        model: '81825',
        vendor: 'AduroSmart',
        description: 'ERIA smart wireless dimming switch',
        fromZigbee: [fz.command_on, fz.command_off, fz.command_step],
        exposes: [e.action(['on', 'off', 'up', 'down'])],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'genLevelCtrl']);
        },
    },
    {
        zigbeeModel: ['AD-Dimmer'],
        model: '81849',
        vendor: 'AduroSmart',
        description: 'ERIA built-in multi dimmer module 300W',
        extend: [m.light({configureReporting: true})],
    },
    {
        zigbeeModel: ['BDP3001'],
        model: '81855',
        vendor: 'AduroSmart',
        description: 'ERIA smart plug (dimmer)',
        extend: [m.light({configureReporting: true})],
    },
    {
        zigbeeModel: ['BPU3'],
        model: 'BPU3',
        vendor: 'AduroSmart',
        description: 'ERIA smart plug',
        extend: [m.onOff()],
    },
    {
        zigbeeModel: ['Extended Color LED Strip V1.0'],
        model: '81863',
        vendor: 'AduroSmart',
        description: 'Eria color LED strip',
        extend: [m.light({colorTemp: {range: [153, 500]}, color: {modes: ['xy', 'hs'], applyRedFix: true}})],
    },
    {
        zigbeeModel: ['AD-81812', 'AD-ColorTemperature3001'],
        model: '81812/81814',
        vendor: 'AduroSmart',
        description: 'Eria tunable white A19/BR30 smart bulb',
        extend: [m.light({colorTemp: {range: [153, 500]}, color: {modes: ['xy', 'hs']}})],
    },
    {
        zigbeeModel: ['ONOFFRELAY'],
        model: '81898',
        vendor: 'AduroSmart',
        description: 'AduroSmart on/off relay',
        extend: [m.onOff({powerOnBehavior: false})],
    },
    {
        zigbeeModel: ['AD-BR3RGBW3001'],
        model: '81813-V2',
        vendor: 'AduroSmart',
        description: 'BR30 light bulb',
        extend: [m.light({colorTemp: {range: [153, 500]}, color: {modes: ['xy', 'hs'], enhancedHue: true}})],
    },
    {
        fingerprint: [{modelID: 'Smart Siren', manufacturerName: 'AduroSmart Eria'}],
        model: '81868',
        vendor: 'AduroSmart',
        description: 'Siren',
        fromZigbee: [fz.battery, fz.ias_wd, fz.ias_enroll, fz.ias_siren],
        toZigbee: [tz.warning_simple, tz.ias_max_duration, tz.warning],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genBasic', 'ssIasZone', 'ssIasWd']);
            await endpoint.read('ssIasZone', ['zoneState', 'iasCieAddr', 'zoneId']);
            await endpoint.read('ssIasWd', ['maxDuration']);
        },
        exposes: [
            e.tamper(),
            e.warning(),
            e.numeric('max_duration', ea.ALL).withUnit('s').withValueMin(0).withValueMax(600).withDescription('Duration of Siren'),
            e.binary('alarm', ea.SET, 'ON', 'OFF').withDescription('Manual start of siren'),
        ],
    },
    {
        fingerprint: [{modelID: 'ONOFF_METER_RELAY', manufacturerName: 'AduroSmart ERIA'}],
        model: '81998',
        vendor: 'AduroSmart',
        description: 'ERIA built-in on/off relay (with power measurements)',
        extend: [m.onOff(), m.electricityMeter({cluster: 'electrical'})],
    },
    {
        zigbeeModel: ['DimmerM3002'],
        model: '81949',
        vendor: 'AduroSmart',
        description: 'ERIA built-in dimmer module (with power measurements)',
        extend: [
            m.light({configureReporting: true}),
            m.electricityMeter({cluster: 'electrical'}),
            adurosmartDimmerLoadControlMode(),
            adurosmartDimmerSwitchMode(),
            adurosmartDimmerInvertSwitch(),
            adurosmartDimmerSceneActivation(),
            adurosmartDimmerS1DoubleClickScene(),
            adurosmartDimmerS2DoubleClickScene(),
            adurosmartDimmerMinBrightnessLevel(),
            adurosmartDimmerMaxBrightnessLevel(),
            adurosmartDimmerManualDimmingStepSize(),
            adurosmartDimmerManualDimmingTime(),
        ],
    },
];

export default definitions;
module.exports = definitions;
