import { useEffect, useState } from "react";
import { getYamlData } from "@/infrastructure/adapters/yamlAdapter";
import { convertDecikelvinToCelsius, convertMwToKwh } from "../services/weatherServices";

interface DataPoint {
    time: string;
    temperatureC: number;
    energyKWh: number;
}

export function useData() {
    const [values, setValues] = useState<DataPoint[]>([]);
    const [index, setIndex] = useState(0);
    const [current, setCurrent] = useState<DataPoint | null>(null);

    useEffect(() => {
        getYamlData().then((data) => {
            // Asegurar que ambos arrays tengan la misma longitud
            const minLength = Math.min(
                data.temperature.values.length,
                data.power.values.length
            );

            const unified = Array.from({ length: minLength }, (_, i) => {
                return {
                    time: data.power.values[i].time, // Usar el mismo time para ambos
                    temperatureC: convertDecikelvinToCelsius(data.temperature.values[i].value),
                    energyKWh: convertMwToKwh(data.power.values[i].value, 5),
                };
            });

            setValues(unified);
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((i) => (i < values.length - 1 ? i + 1 : i));
        }, 5000);
        return () => clearInterval(interval);
    }, [values]);

    useEffect(() => {
        if (values[index]) {
            setCurrent(values[index]);
        }
    }, [index, values]);

    return current;
}