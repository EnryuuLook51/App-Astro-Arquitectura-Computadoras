export interface Video {
  id: number;
  title: string;
  group: string;
  driveId: string;
  description?: string;
}

export interface Topic {
  id: number;
  name: string;
  slug: string;
  videos: Video[];
}

export const videosData: Record<string, Topic[]> = {
  unidad1: [
    {
      id: 1,
      name: "Introducción a la Arquitectura de Computadoras",
      slug: "introduccion",
      videos: [
        {
          id: 1,
          title: "Semana 1 - Introducción",
          group: "",
          driveId: "PENDIENTE",
          description: "Video pendiente de subida"
        }
      ]
    },
    {
      id: 2,
      name: "Segmentación de Cauce y Procesadores Segmentados",
      slug: "segmentacion-cauce",
      videos: [
        {
          id: 2,
          title: "Semana 2 - Segmentación de Cauce",
          group: "Rubio Gonzales & Valentin Valera & Castillo Toribio",
          driveId: "1gsY_cUXa8aYzQ41BGr4vuOag3pAHWBgP",
          description: "Segmentación de cauce y procesadores segmentados"
        }
      ]
    },
    {
      id: 3,
      name: "Procesadores Superescalares: Microarquitectura y Principios",
      slug: "procesadores-superescalares",
      videos: [
        {
          id: 3,
          title: "Semana 3 - Procesadores Superescalares",
          group: "Norabuena Melgarejo, Crisanto Santiago & Sander Sleyther",
          driveId: "1TlfPyAbkmd5TW-2rIDnQX-fz9ZP6gwrR",
          description: "Microarquitectura y principios de funcionamiento"
        }
      ]
    },
    {
      id: 4,
      name: "Procesadores Superescalares: Implementación",
      slug: "superescalares-implementacion",
      videos: [
        {
          id: 4,
          title: "Semana 4 - Implementación de Superescalares",
          group: "Robles Cueva, Rodriguez Cordova & Valdiviezo Loloy",
          driveId: "1vrKkBEbO18jsVck5xTJ3nKo-82O0HnvS",
          description: "Implementación de procesadores superescalares"
        }
      ]
    },
    {
      id: 5,
      name: "Procesadores Vectoriales",
      slug: "procesadores-vectoriales",
      videos: [
        {
          id: 5,
          title: "Semana 5 - Procesadores Vectoriales",
          group: "Giraldo Barreto, Marcelo Yamauchi & Paredes Flores",
          driveId: "1j94ecFbw3utGON5VQ-3VtsT4ZeCrmCNZ",
          description: "VPU: Vector Processor Unit - Arquitectura y aplicaciones"
        }
      ]
    }
  ]
};

// Helper function para obtener videos por slug
export function getTopicBySlug(unitKey: string, slug: string): Topic | undefined {
  const unit = videosData[unitKey];
  return unit?.find(topic => topic.slug === slug);
}
