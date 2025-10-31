import React from 'react';

interface DataDisplayProps {
    title: string;
    value: number | null;
    time: string;
    unit: string;
    icon: React.ReactNode;
}

export function DataDisplay({ title, value, time, unit, icon }: DataDisplayProps) {
    return (
        <div className="flex flex-1 flex-row justify-between items-start p-6 rounded-xl shadow-md bg-white/90 backdrop-blur-sm border-blue-200 max-w-2xl max-md:w-full">
            <div>
                <p className='text-sm font-medium text-blue-700'>{title}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-blue-800">{value !== null ? value.toFixed(2) : "Cargando..."}</span>
                    <span className="text-lg text-blue-700">{unit}</span>
                </div>
                <span className="text-sm text-blue-700">{time}</span>
            </div>

            <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                {icon}
            </div>

        </div>
    );
}
