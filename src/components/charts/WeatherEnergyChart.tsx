import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useChartData } from "@/domain/hooks/useChartData";

// Tooltip personalizado con Tailwind
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                    {payload[0].payload.time}
                </p>
                <p className="text-sm text-red-500 font-medium">
                    Temperatura: {payload[0].value.toFixed(2)}°C
                </p>
                <p className="text-sm text-blue-600 font-medium">
                    Energía: {payload[1].value.toFixed(2)} kWh
                </p>
            </div>
        );
    }
    return null;
};

// Leyenda personalizada con Tailwind
const CustomLegend = ({ payload }: any) => {
    return (
        <div className="flex justify-center gap-6 mt-4">
            {payload.map((entry: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                        {entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

interface WeatherEnergyChartProps {
    time: string | null;
    temperature: number | null;
    energy: number | null;
}

const WeatherEnergyChart = ({ time, temperature, energy }: WeatherEnergyChartProps) => {
    const { chartData, isLoading, isEmpty } = useChartData({ time, temperature, energy });

    if (isLoading || isEmpty) {
        return (
            <div className="w-full h-[400px] flex items-center justify-center bg-white rounded-xl shadow-md">
                <p className="text-gray-500 text-lg">
                    {isLoading ? "Cargando datos..." : "Esperando datos del histórico..."}
                </p>
            </div>
        );
    }

    return (
        <div className="w-full bg-white rounded-xl shadow-md p-6 max-md:p-2">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 60, left: 20, bottom: 20 }}
                >
                    {/* Grid */}
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                        opacity={0.5}
                    />

                    {/* Eje X - Tiempo */}
                    <XAxis
                        dataKey="time"
                        stroke="#6b7280"
                        style={{ fontSize: '12px', fontFamily: 'inherit' }}
                        tick={{ fill: '#6b7280' }}
                    />

                    {/* Eje Y Izquierdo - Temperatura */}
                    <YAxis
                        yAxisId="temperature"
                        domain={['auto', 'auto']}
                        stroke="#ef4444"
                        style={{ fontSize: '12px', fontFamily: 'inherit' }}
                        tick={{ fill: '#ef4444' }}
                        label={{
                            value: '°C',
                            angle: -90,
                            position: 'insideLeft',
                            style: { fill: '#ef4444', fontWeight: 'bold' }
                        }}
                    />

                    {/* Eje Y Derecho - Energía */}
                    <YAxis
                        yAxisId="energy"
                        orientation="right"
                        domain={['auto', 'auto']}
                        stroke="#3b82f6"
                        style={{ fontSize: '12px', fontFamily: 'inherit' }}
                        tick={{ fill: '#3b82f6' }}
                        label={{
                            value: 'kWh',
                            angle: 90,
                            position: 'insideRight',
                            style: { fill: '#3b82f6', fontWeight: 'bold' }
                        }}
                    />

                    {/* Tooltip */}
                    <Tooltip content={<CustomTooltip />} />

                    {/* Leyenda */}
                    <Legend content={<CustomLegend />} />

                    {/* Línea de Temperatura */}
                    <Line
                        yAxisId="temperature"
                        type="monotone"
                        dataKey="temperature"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ r: 2, fill: '#ef4444' }}
                        activeDot={{ r: 5 }}
                        name="Temperatura (°C)"
                    />

                    {/* Línea de Energía */}
                    <Line
                        yAxisId="energy"
                        type="monotone"
                        dataKey="energy"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 2, fill: '#3b82f6' }}
                        activeDot={{ r: 5 }}
                        name="Energía (kWh)"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeatherEnergyChart;