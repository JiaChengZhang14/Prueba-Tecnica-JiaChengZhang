import YAML from "yaml";

// Definición de tipos para los datos de temperatura
export interface DataRecord {
    time: string;
    value: number;
}

export interface WeatherData {
    temperature: {
        unit: string;
        values: DataRecord[];
    };
    power: {
        unit: string;
        values: DataRecord[];
    };
}


function normalize(values: any[]): DataRecord[] {
    return values.map((v) => ({
        time: v.time,
        value: parseFloat(v.value),
    }));
}


function timeToSeconds(time: string): number {
    const [h, m, s] = time.split(":").map(Number);
    return h * 3600 + m * 60 + s;
}

export async function getYamlData(): Promise<WeatherData> {
    const response = await fetch("/data.yml");
    if (!response.ok) throw new Error(`Failed to fetch data.yml: ${response.status}`);

    const text = await response.text();
    const parsed = YAML.parse(text);

    const temperatureValues = normalize(parsed.temperature?.values ?? []);
    const powerValues = normalize(parsed.power?.values ?? []);

    // ordenar por tiempo por si las listas no vienen ordenadas
    const sortByTime = (arr: DataRecord[]) =>
        arr.sort((a, b) => timeToSeconds(a.time) - timeToSeconds(b.time));

    sortByTime(temperatureValues);
    sortByTime(powerValues);

    // Obtener hora actual (HH:mm:ss) en segundos
    const now = new Date();
    const currentSeconds =
        now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    // Busca índice más cercano a un targetSeconds dado
    const findClosestIndexTo = (values: DataRecord[], targetSeconds: number) => {
        if (!values.length) return 0;
        let closestIndex = 0;
        let minDiff = Infinity;
        values.forEach((v, i) => {
            const t = timeToSeconds(v.time);
            const diff = Math.abs(t - targetSeconds);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = i;
            }
        });
        return closestIndex;
    };

    // Elegir ancla en temperature (si existe), sino en power, sino usar 0
    let tempStart = 0;
    let powerStart = 0;

    if (temperatureValues.length) {
        tempStart = findClosestIndexTo(temperatureValues, currentSeconds);
        const anchorSeconds = timeToSeconds(temperatureValues[tempStart].time);
        powerStart = powerValues.length ? findClosestIndexTo(powerValues, anchorSeconds) : 0;
    } else if (powerValues.length) {
        powerStart = findClosestIndexTo(powerValues, currentSeconds);
        const anchorSeconds = timeToSeconds(powerValues[powerStart].time);
        tempStart = temperatureValues.length ? findClosestIndexTo(temperatureValues, anchorSeconds) : 0;
    }

    console.log("CurrentSeconds:", currentSeconds, "TempStart:", tempStart, "PowerStart:", powerStart);

    return {
        temperature: {
            unit: parsed.temperature?.unit ?? "",
            values: temperatureValues.slice(tempStart),
        },
        power: {
            unit: parsed.power?.unit ?? "",
            values: powerValues.slice(powerStart),
        },
    };
}