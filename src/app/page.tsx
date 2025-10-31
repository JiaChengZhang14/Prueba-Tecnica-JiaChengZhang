"use client";

import WeatherEnergyChart from "@/components/charts/WeatherEnergyChart";
import { DataDisplay } from "@/components/webcomponents/dataDisplay";
import { useData } from "@/domain/hooks/useData";
import { Thermometer, Zap } from "lucide-react";

export default function Page() {
  const data = useData();

  return (
    <main className="mx-auto flex flex-col gap-15 p-14 max-md:p-6 max-md:gap-5">

      <section className="flex flex-row justify-between items-center max-w-7xl mx-auto w-full max-md:flex-col max-md:items-start max-md:gap-6 mb-8 ">
        <div className="flex flex-col mr-12 gap-4 max-md:w-full">
          <h1 className="font-bold text-5xl font-sans text-blue-800 ">Predicción Meteorológica</h1>
          <h2 className="font-normal text-xl font-sans text-blue-800 max-md:w-full">Datos de temperatura y producción energética en tiempo real</h2>
        </div>
        <div className="flex flex-row gap-4">
          <p className="text-lg font-bold text-blue-800">
            Hora: {data ? data.time : "Cargando hora..."}
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-8 max-w-7xl mx-auto w-full">
        <h3 className="font-bold text-2xl font-sans text-blue-800">Valores Actuales</h3>
        <div className="flex flex-row justify-center items-center gap-8 max-md:flex-col max-md:w-full">
          <DataDisplay
            title="Temperatura"
            value={data ? data.temperatureC : null}
            time={data ? data.time : "Cargando hora..."}
            unit="°C"
            icon={<Thermometer className="h-6 w-6" />}
          />
          <DataDisplay
            title="Energía Generada"
            value={data ? data.energyKWh : null}
            time={data ? data.time : "Cargando hora..."}
            unit="kWh"
            icon={<Zap className="h-6 w-6" />}
          />
        </div>
      </section>

      <section className="flex flex-col gap-8 max-w-7xl mx-auto w-full">
        <h3 className="font-bold text-2xl font-sans text-blue-800">Gráficas Históricas</h3>
        <div className="flex flex-row justify-center items-center gap-8">
          <WeatherEnergyChart
            time={data?.time || null}
            temperature={data?.temperatureC || null}
            energy={data?.energyKWh || null}
          />
        </div>
      </section>
    </main>
  );
}