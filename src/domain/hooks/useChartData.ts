import { useEffect, useState, useRef } from "react";

export interface ChartDataPoint {
    time: string;
    temperature: number;
    energy: number;
}

interface UseChartDataProps {
    time: string | null;
    temperature: number | null;
    energy: number | null;
}

/**
 * Hook para obtener los datos del gráfico histórico de temperatura y energía.
 * @param time - El tiempo actual.
 * @param temperature - La temperatura actual.
 * @param energy - La energía actual.
 * @returns Un objeto con los datos del gráfico y el estado de carga.
 */
export function useChartData({ time, temperature, energy }: UseChartDataProps) {
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const updateCounterRef = useRef(0); // Contador de actualizaciones
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (!time || temperature === null || energy === null) {
            setIsLoading(true);
            return;
        } else if (time && temperature !== null && energy !== null) {
            updateCounterRef.current++;
            setIsLoading(false);
            // Agregar punto cada 12 actualizaciones (1 minuto)
            if (updateCounterRef.current % 12 === 0) {
                const newPoint: ChartDataPoint = {
                    time,
                    temperature,
                    energy,
                };

                setChartData((prev) => {
                    const maxPoints = 30; // 30 minutos de histórico
                    const updated = [...prev, newPoint];
                    return updated.length > maxPoints
                        ? updated.slice(updated.length - maxPoints)
                        : updated;
                });
            }
        }
    }, [time, temperature, energy]);

    return { chartData, isLoading, isEmpty: chartData.length === 0 };
}