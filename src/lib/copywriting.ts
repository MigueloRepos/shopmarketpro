import { useState, useEffect } from "react";

export type TimeOfDay = "morning" | "afternoon" | "night";

export interface UserLocation {
  city: string;
  country: string;
  countryCode: string;
}

// Map timezone indicators to Spanish countries and default major cities
const TIMEZONE_MAP: Record<string, { country: string; countryCode: string; city: string }> = {
  "Europe/Madrid": { country: "España", countryCode: "ES", city: "Madrid" },
  "Europe/Andorra": { country: "Andorra", countryCode: "AD", city: "Andorra" },
  "Atlantic/Canary": { country: "Canarias", countryCode: "ES", city: "Las Palmas" },
  "America/Mexico_City": { country: "México", countryCode: "MX", city: "Ciudad de México" },
  "America/Monterrey": { country: "México", countryCode: "MX", city: "Monterrey" },
  "America/Tijuana": { country: "México", countryCode: "MX", city: "Tijuana" },
  "America/Bogota": { country: "Colombia", countryCode: "CO", city: "Bogotá" },
  "America/Argentina": { country: "Argentina", countryCode: "AR", city: "Buenos Aires" },
  "America/Santiago": { country: "Chile", countryCode: "CL", city: "Santiago" },
  "America/Lima": { country: "Perú", countryCode: "PE", city: "Lima" },
  "America/Caracas": { country: "Venezuela", countryCode: "VE", city: "Caracas" },
  "America/Montevideo": { country: "Uruguay", countryCode: "UY", city: "Montevideo" },
  "America/Guayaquil": { country: "Ecuador", countryCode: "EC", city: "Guayaquil" },
  "America/Guatemala": { country: "Guatemala", countryCode: "GT", city: "Guatemala" },
  "America/Costa_Rica": { country: "Costa Rica", countryCode: "CR", city: "San José" },
  "America/Santo_Domingo": {
    country: "República Dominicana",
    countryCode: "DO",
    city: "Santo Domingo",
  },
  "America/Panama": { country: "Panamá", countryCode: "PA", city: "Panamá" },
  "America/La_Paz": { country: "Bolivia", countryCode: "BO", city: "La Paz" },
  "America/Asuncion": { country: "Paraguay", countryCode: "PY", city: "Asunción" },
  "America/El_Salvador": { country: "El Salvador", countryCode: "SV", city: "San Salvador" },
  "America/Tegucigalpa": { country: "Honduras", countryCode: "HN", city: "Tegucigalpa" },
  "America/Managua": { country: "Nicaragua", countryCode: "NI", city: "Managua" },
  "America/Puerto_Rico": { country: "Puerto Rico", countryCode: "PR", city: "San Juan" },
};

// Simple helper to guess location based on browser's timezone
function guessLocationFromTimezone(): UserLocation {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return { city: "tu ciudad", country: "tu país", countryCode: "GEN" };

    // Direct match
    if (TIMEZONE_MAP[tz]) {
      return TIMEZONE_MAP[tz];
    }

    // Prefix matches (e.g., America/Argentina/Buenos_Aires matches America/Argentina)
    for (const key of Object.keys(TIMEZONE_MAP)) {
      if (tz.startsWith(key)) {
        return TIMEZONE_MAP[key];
      }
    }

    // Latin American generic indicator
    if (tz.startsWith("America/")) {
      return { city: "tu ciudad", country: "Latinoamérica", countryCode: "LATAM" };
    }
    if (tz.startsWith("Europe/")) {
      return { city: "tu ciudad", country: "Europa", countryCode: "EU" };
    }
  } catch (e) {
    console.warn("No se pudo obtener la zona horaria:", e);
  }

  return { city: "tu ciudad", country: "tu país", countryCode: "GEN" };
}

// Copywriting template design structure
interface CopyTemplate {
  headline: string; // Dynamic HTML supported via string replacement
  subheadline: string;
}

// Standard copy translations mapped by Country Code & Time of Day
const COPY_TEMPLATES: Record<string, Record<TimeOfDay, CopyTemplate>> = {
  ES: {
    morning: {
      headline:
        'Empieza tu mañana en {City}<br/>con la pureza <span class="italic font-light text-gradient">del sonido.</span>',
      subheadline:
        "La luz ya brilla en {Country}. Transforma tus primeras horas del día con una elegancia acústica excepcional y diseño de vanguardia. Envío express disponible.",
    },
    afternoon: {
      headline:
        'Haz de tu tarde en {City}<br/>un momento <span class="italic font-light text-gradient">de puro lujo.</span>',
      subheadline:
        "No te conformes con lo ordinario hoy. Eleva tu tarde en {Country} con la máxima expresión de fidelidad de audio y confort atemporal en cada detalle.",
    },
    night: {
      headline:
        'Desconecta en {City}<br/>y sumérgete en <span class="italic font-light text-gradient">lo sublime.</span>',
      subheadline:
        "Termina el día con una inmersión absoluta. Disfruta de una acústica refinada con cancelación de ruido de alta gama en {Country} esta noche.",
    },
  },
  MX: {
    morning: {
      headline:
        'Comienza tu día en {City}<br/>con claridad <span class="italic font-light text-gradient">absoluta.</span>',
      subheadline:
        "Inicia tus actividades hoy con la mejor energía acústica. Experimenta sonido premium con envío express disponible en todo México.",
    },
    afternoon: {
      headline:
        'Redefine tu tarde en {City}<br/>con estilo <span class="italic font-light text-gradient">exclusivo.</span>',
      subheadline:
        "El complemento premium para tu jornada en México. Disfruta de un diseño sofisticado y un audio envolvente que te acompaña en todo momento.",
    },
    night: {
      headline:
        'El descanso perfecto<br/>para tu noche en <span class="italic font-light text-gradient">{City}.</span>',
      subheadline:
        "Apaga el caos exterior en {Country}. Disfruta de tus canciones favoritas con una experiencia íntima, ultra-confortable y de máxima fidelidad.",
    },
  },
  CO: {
    morning: {
      headline:
        'Despierta tus mañanas en {City}<br/>con sonido <span class="italic font-light text-gradient">de alta gama.</span>',
      subheadline:
        "Haz que cada hora cuente hoy. Comienza con la pureza y los detalles de una ingeniería acústica insuperable. Garantía total y envío rápido.",
    },
    afternoon: {
      headline:
        'Eleva tu tarde en {City}<br/>al nivel <span class="italic font-light text-gradient">profesional.</span>',
      subheadline:
        "Productividad y placer auditivo en sintonía perfecta en Colombia. Siente la excelencia del sonido nítido y el diseño atemporal de Lumina.",
    },
    night: {
      headline:
        'Tu noche en {City}<br/>merece una <span class="italic font-light text-gradient">frecuencia única.</span>',
      subheadline:
        "Desconéctate de la rutina en Colombia. Relájate y sumérgete en un refugio sonoro premium con la máxima fidelidad y comodidad.",
    },
  },
  AR: {
    morning: {
      headline:
        'Arrancá tu día en {City}<br/>con la pureza <span class="italic font-light text-gradient">del sonido.</span>',
      subheadline:
        "Comenzá la mañana con energía renovada y alta fidelidad en {Country}. Descubrí la combinación perfecta de diseño premium y rendimiento acústico.",
    },
    afternoon: {
      headline:
        'Disfrutá la tarde en {City}<br/>con estilo y <span class="italic font-light text-gradient">sofisticación.</span>',
      subheadline:
        "Marcá la diferencia en tu rutina hoy. Tecnología acústica exclusiva para tus oídos con el confort y diseño premium que estabas buscando.",
    },
    night: {
      headline:
        'Terminá tu noche en {City}<br/>con sonido <span class="italic font-light text-gradient">de alta gama.</span>',
      subheadline:
        "Desconectá, relajá y sentí cada matiz sonoro en Argentina. La manera más íntima y pura de descansar al finalizar el día.",
    },
  },
  CL: {
    morning: {
      headline:
        'Comienza tu mañana en {City}<br/>con rendimiento <span class="italic font-light text-gradient">insuperable.</span>',
      subheadline:
        "El mejor inicio para tus proyectos hoy en Chile. Eleva tus estándares auditivos con un diseño acústico impecable y envío rápido.",
    },
    afternoon: {
      headline:
        'Optimiza tu tarde en {City}<br/>con acústica <span class="italic font-light text-gradient">de vanguardia.</span>',
      subheadline:
        "No pierdas el enfoque esta tarde en Chile. Vive una experiencia de audio inmersiva con tecnología premium que complementa tu estilo.",
    },
    night: {
      headline:
        'Desconecta del día en {City}<br/>con inmersión <span class="italic font-light text-gradient">total.</span>',
      subheadline:
        "Relájate al final de la jornada con la firma sonora premium de Lumina. Comodidad absoluta para disfrutar tu noche con alta fidelidad.",
    },
  },
  // Fallback / General Spanish
  GEN: {
    morning: {
      headline:
        'Eleva tus mañanas en {City}<br/>con acústica <span class="italic font-light text-gradient">excepcional.</span>',
      subheadline:
        "Empieza el día con la máxima claridad. Descubre Lumina en {Country} y experimenta la pureza sonora que inspira tu rutina desde temprano.",
    },
    afternoon: {
      headline:
        'Tu tarde en {City} merece<br/>un sonido <span class="italic font-light text-gradient">superior.</span>',
      subheadline:
        "Haz una pausa de lujo en tu día. Disfruta de la elegancia acústica y el diseño ergonómico exclusivo que redefinen tu experiencia hoy.",
    },
    night: {
      headline:
        'Desconéctate en {City}<br/>con sonido <span class="italic font-light text-gradient">envolvente.</span>',
      subheadline:
        "La noche es tuya en {Country}. Regálate un descanso sublime o sumérgete en tus listas de reproducción favoritas con un sonido de alta gama.",
    },
  },
};

export function useLocalizedCopy() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("morning");
  const [location, setLocation] = useState<UserLocation>({
    city: "tu ciudad",
    country: "tu país",
    countryCode: "GEN",
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Detect Time of Day
    const hour = new Date().getHours();
    let currentPeriod: TimeOfDay = "morning";
    if (hour >= 12 && hour < 19) {
      currentPeriod = "afternoon";
    } else if (hour >= 19 || hour < 6) {
      currentPeriod = "night";
    }
    setTimeOfDay(currentPeriod);

    // 2. Set Synchronous baseline location based on timezone
    const initialLocation = guessLocationFromTimezone();
    setLocation(initialLocation);
    setIsLoaded(true);

    // 3. Asynchronously fetch detailed IP location
    // We fetch from a free, public IP API. If it succeeds, we update the state with precise values.
    // This is entirely non-blocking and works as a progressive enhancement.
    let isSubscribed = true;
    fetch("https://ipapi.co/json/")
      .then((res) => {
        if (!res.ok) throw new Error("API response error");
        return res.json();
      })
      .then((data) => {
        if (isSubscribed && data && data.city) {
          // Translate some country codes or direct use
          const countryName = data.country_name === "Spain" ? "España" : data.country_name;
          const countryCode = data.country_code || "GEN";
          setLocation({
            city: data.city,
            country: countryName,
            countryCode: COPY_TEMPLATES[countryCode] ? countryCode : "GEN",
          });
        }
      })
      .catch((err) => {
        console.log(
          "No se pudo obtener localización exacta por IP, usando huso horario:",
          err.message,
        );
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  // Match the template according to country code (or generic fallback) and time of day
  const activeTemplates = COPY_TEMPLATES[location.countryCode] || COPY_TEMPLATES.GEN;
  const template = activeTemplates[timeOfDay];

  // Capitalize city helper
  const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formattedCity = capitalize(location.city === "tu ciudad" ? "tu ciudad" : location.city);
  const formattedCountry = location.country;

  // Perform replacements
  const replacePlaceholders = (text: string) => {
    return text.replace(/{City}/g, formattedCity).replace(/{Country}/g, formattedCountry);
  };

  const finalHeadline = replacePlaceholders(template.headline);
  const finalSubheadline = replacePlaceholders(template.subheadline);

  const timeOfDaySpanish =
    timeOfDay === "morning" ? "Mañana" : timeOfDay === "afternoon" ? "Tarde" : "Noche";

  const greeting =
    timeOfDay === "morning"
      ? `¡Buenos días desde ${formattedCity}!`
      : timeOfDay === "afternoon"
        ? `¡Buenas tardes desde ${formattedCity}!`
        : `¡Buenas noches desde ${formattedCity}!`;

  return {
    headline: finalHeadline,
    subheadline: finalSubheadline,
    city: formattedCity,
    country: formattedCountry,
    timeOfDay,
    timeOfDayLabel: timeOfDaySpanish,
    greeting,
    isLoaded,
  };
}
