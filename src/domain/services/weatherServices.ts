

//Funcion para convertir Kelvin a Celsius
export function convertDecikelvinToCelsius(decikelvin: number): number {
    return decikelvin / 10 - 273.15;
}

export function convertMwToKwh(powerMW: number, seconds: number): number {
    const powerKW = powerMW * 1000; // 1 MW = 1000 kW
    return (powerKW * seconds) / 3600;
}
