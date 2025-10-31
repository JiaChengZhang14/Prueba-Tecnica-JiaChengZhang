# Predicción Meteorológica - Dashboard en Tiempo Real

Aplicación web para visualizar datos de predicción meteorológica y producción energética en tiempo real, desarrollada como prueba técnica para vacante de programador Frontend/Fullstack.

## 🚀 Tecnologías Utilizadas

- **Next.js 15** - Framework de React
- **React 19** - Biblioteca de interfaces de usuario
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Recharts** - Librería de gráficas
- **YAML** - Formato de datos de entrada
- **Lucide React** - Iconos

## 📋 Requisitos Previos

- Node.js 18.x o superior
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd <nombre-del-proyecto>
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Asegurarse de que el archivo `data.yml` esté en la carpeta `public/`**
```
public/
  └── data.yml
```

## 🎯 Lanzar la Aplicación

### Modo Desarrollo
```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### Modo Producción
```bash
# Construir la aplicación
npm run build

# Iniciar el servidor de producción
npm start
```

## 📊 Funcionalidades

### 1. **Valores Actuales en Tiempo Real**
- Muestra la temperatura actual en grados Celsius (°C)
- Muestra la energía generada en kilovatios-hora (kWh)
- Se actualiza cada **5 segundos** según la hora actual del sistema

### 2. **Gráfica Histórica**
- Visualización con doble eje Y:
  - **Eje izquierdo**: Temperatura (°C) - línea roja
  - **Eje derecho**: Energía (kWh) - línea azul
- Intervalos minutales (agrega un punto cada 60 segundos)
- Mantiene hasta 30 minutos de histórico visible
- Tooltip interactivo que muestra valores exactos al pasar el cursor

### 3. **Indicador de Hora**
- Muestra la hora actual del dato siendo visualizado
- Sincronizado entre todas las secciones

## 🏗️ Arquitectura del Proyecto

El proyecto sigue principios de **Clean Architecture**:

```
src/
├── app/
│   ├── page.tsx              # Página principal
│   └── globals.css           # Estilos globales
├── components/
│   ├── charts/
│   │   └── WeatherEnergyChart.tsx  # Componente de gráfica
│   └── webcomponents/
│       └── dataDisplay.tsx   # Tarjetas de datos actuales
├── domain/
│   ├── hooks/
│   │   ├── useData.ts        # Hook principal de datos
│   │   └── useChartData.ts   # Hook para gestión de gráfica
│   └── services/
│       └── weatherServices.ts # Conversiones de unidades
└── infrastructure/
    └── adapters/
        └── yamlAdapter.ts    # Carga y parseo del YAML
```

## 🔄 Funcionamiento Interno

### Flujo de Datos

1. **Carga Inicial**
   - `yamlAdapter.ts` lee el archivo `data.yml`
   - Encuentra el índice más cercano a la hora actual del sistema
   - Retorna los arrays de temperatura y energía desde ese punto

2. **Actualización Cada 5 Segundos**
   - El hook `useData()` mantiene un índice que se incrementa cada 5 segundos
   - En cada actualización, convierte las unidades:
     - Temperatura: Decikelvin → Celsius
     - Energía: Megavatios (MW) → Kilovatios-hora (kWh)
   - Ambos valores comparten el mismo timestamp para garantizar sincronización

3. **Actualización de Gráfica (Cada Minuto)**
   - El hook `useChartData()` recibe los datos actuales como props
   - Cuenta las actualizaciones (cada 5 segundos)
   - Cada 12 actualizaciones (= 60 segundos), agrega un punto a la gráfica
   - Mantiene un máximo de 30 puntos (30 minutos de histórico)

### Conversiones de Unidades

**Temperatura:**
```typescript
// De decikelvin a Celsius
°C = (decikelvin / 10) - 273.15
```

**Energía:**
```typescript
// De MW a kWh en un intervalo de 5 segundos
kW = MW × 1000
kWh = (kW × 5 segundos) / 3600
```

## 🎨 Diseño Visual

- **Paleta de colores**: Gradiente azul claro a verde claro
- **Tarjetas**: Fondo blanco semitransparente con efecto blur
- **Gráfica**: Escalado automático e independiente para cada eje Y
- **Responsive**: Adaptable a diferentes tamaños de pantalla

## 📝 Decisiones Técnicas

### ¿Por qué Recharts?
- Escalado automático independiente para cada eje Y
- Sintaxis declarativa que encaja con React
- TypeScript nativo
- Fácil personalización con Tailwind CSS

### ¿Por qué un Hook Unificado?
- **Garantiza sincronización perfecta** entre temperatura y energía
- **Una sola llamada** al archivo YAML
- **Mismo timestamp** para todos los datos
- **Evita race conditions** entre llamadas asíncronas

### ¿Por qué Intervalos Minutales en la Gráfica?
- **Mejor rendimiento**: Menos puntos a renderizar
- **Visualización más clara**: No sobrecarga la gráfica
- **Cumple requisitos**: Representación con intervalos minutales
- **Mantiene precisión**: Los valores actuales siguen actualizándose cada 5 segundos



## 📄 Licencia

Proyecto desarrollado como prueba técnica.

## 👤 Autor

JiaCheng Zhang <br>
contact.jczhang@gmail.com

---

**Fecha de desarrollo**: 2025