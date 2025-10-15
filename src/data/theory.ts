// src/data/theory.ts

export interface TheorySection {
  id: string;
  title: string;
  content: string;
  examples?: string[];
  diagrams?: string[];  // URLs de imágenes
  keyPoints?: string[];
}

export interface TheoryContent {
  slug: string;
  title: string;
  description: string;
  sections: TheorySection[];
  references?: string[];
}

export const theoryData: Record<string, TheoryContent> = {
  "segmentacion-cauce": {
    slug: "segmentacion-cauce",
    title: "Segmentación de Cauce (Pipelining)",
    description: "Una técnica de diseño fundamental en procesadores modernos que divide la ejecución de una instrucción en múltiples etapas para procesar varias instrucciones simultáneamente, mejorando el rendimiento general del sistema.",
    sections: [
      {
        id: "concepto",
        title: "Concepto de Segmentación",
        content: `La segmentación, también conocida como 'pipeline', es una técnica que permite solapar la ejecución de múltiples instrucciones. Funciona de manera análoga a una cadena de montaje industrial: en lugar de procesar una instrucción completa antes de comenzar la siguiente, el procesador se divide en varias etapas independientes. Cada etapa trabaja en una parte diferente de una instrucción distinta al mismo tiempo, lo que aumenta significativamente el número de instrucciones que pueden completarse por unidad de tiempo (throughput).`,
        keyPoints: [
          "Divide la ejecución de instrucciones en etapas secuenciales.",
          "Permite que múltiples instrucciones estén en diferentes fases de ejecución simultáneamente.",
          "Aumenta el rendimiento (throughput) del procesador.",
          "Mejora el aprovechamiento del hardware, ya que todas las unidades están ocupadas en cada ciclo."
        ],
        diagrams: [
          "/images/temas/segmentacion-cauce/pipeline-concept.png"
        ]
      },
      {
        id: "etapas",
        title: "Etapas Típicas de un Pipeline",
        content: `Un pipeline clásico, como el del RISC, se compone de cinco etapas. Cada etapa se encarga de una tarea específica en el ciclo de vida de una instrucción. Al finalizar un ciclo de reloj, el resultado de una etapa pasa a la siguiente, permitiendo que una nueva instrucción entre en la primera etapa.`,
        examples: [
          "IF (Instruction Fetch): Búsqueda de la siguiente instrucción desde la memoria.",
          "ID (Instruction Decode): Decodificación de la instrucción y lectura de los operandos desde los registros.",
          "EX (Execute): Ejecución de la operación matemática o lógica en la ALU.",
          "MEM (Memory Access): Acceso a la memoria para leer o escribir datos (solo para instrucciones Load/Store).",
          "WB (Write Back): Escritura del resultado final en un registro."
        ],
        diagrams: [
          "/images/temas/segmentacion-cauce/pipeline-stages.png",
          "/images/temas/segmentacion-cauce/timing-diagram.png"
        ]
      },
      {
        id: "riesgos",
        title: "Riesgos (Hazards) en el Pipeline",
        content: `Los riesgos son condiciones que interrumpen el flujo normal y eficiente del pipeline, impidiendo que una instrucción se ejecute en el ciclo de reloj previsto. Gestionar estos riesgos es crucial para el rendimiento del procesador.`,
        keyPoints: [
          "Riesgos de Datos: Ocurren cuando una instrucción depende del resultado de otra que aún no ha finalizado (ej. RAW, WAR, WAW).",
          "Riesgos Estructurales: Surgen cuando dos instrucciones intentan usar el mismo recurso de hardware al mismo tiempo.",
          "Riesgos de Control: Provocados por instrucciones de salto (branches), que impiden saber qué instrucción buscar a continuación hasta que el salto se resuelve."
        ],
        diagrams: [
          "/images/temas/segmentacion-cauce/data-hazards.png",
          "/images/temas/segmentacion-cauce/control-hazards.png"
        ]
      }
    ],
    references: [
      "Semana 2: Segmentación de Cauce y Procesadores Segmentados"
    ]
  },

  "procesadores-superescalares": {
    slug: "procesadores-superescalares",
    title: "Procesadores Superescalares: Microarquitectura y Principios",
    description: "Una evolución del pipelining que permite a los procesadores ejecutar más de una instrucción por ciclo de reloj (IPC > 1) al explotar el paralelismo a nivel de instrucción (ILP).",
    sections: [
      {
        id: "definicion",
        title: "¿Qué es un Procesador Superescalar?",
        content: `Un procesador superescalar va más allá de un pipeline simple al incorporar múltiples unidades de ejecución en paralelo. Esto le permite despachar (issue) y ejecutar varias instrucciones simultáneamente en un mismo ciclo de reloj, siempre que no existan dependencias entre ellas. El objetivo principal es aumentar el rendimiento al máximo, buscando un IPC (Instrucciones Por Ciclo) superior a 1.`,
        keyPoints: [
          "Objetivo principal: Lograr un IPC > 1.",
          "Utiliza múltiples unidades de ejecución (ALUs, FPUs, etc.) que trabajan en paralelo.",
          "Explota el Paralelismo a Nivel de Instrucción (ILP) presente en el código.",
          "Requiere hardware complejo para detectar y gestionar dependencias de datos y recursos."
        ],
        diagrams: [
          "/images/temas/procesadores-superescalares/superscalar-vs-scalar.png"
        ]
      },
      {
        id: "microarquitectura",
        title: "Microarquitectura y Componentes Clave",
        content: `Para poder procesar múltiples instrucciones a la vez, la microarquitectura superescalar debe ser más ancha y más inteligente que un pipeline escalar. Esto implica poder buscar, decodificar y despachar un bloque de instrucciones en cada ciclo, y no solo una.`,
        examples: [
          "Fetch y Decode Anchos: Capacidad de leer y decodificar múltiples instrucciones por ciclo.",
          "Múltiples Unidades Funcionales: Disponer de varias ALUs, FPUs y unidades de acceso a memoria.",
          "Lógica de Despacho (Issue Logic): Hardware que analiza las dependencias y envía las instrucciones a las unidades funcionales disponibles.",
          "Ventana de Instrucciones: Un buffer donde las instrucciones esperan a que sus operandos estén listos, permitiendo la ejecución fuera de orden."
        ],
        diagrams: [
          "/images/temas/procesadores-superescalares/microarchitecture.png",
          "/images/temas/procesadores-superescalares/issue-logic.png"
        ]
      },
      {
        id: "dependencias",
        title: "El Desafío de las Dependencias",
        content: `El principal obstáculo para un procesador superescalar es la dependencia entre instrucciones. Si una instrucción necesita el resultado de otra, no pueden ejecutarse en paralelo. El hardware debe ser capaz de detectar estas dependencias (de datos y de control) para asegurar que el programa se ejecute correctamente.`,
        keyPoints: [
          "Dependencias de Datos (RAW): Una instrucción necesita leer un dato que una instrucción anterior va a escribir.",
          "Dependencias Falsas (WAR, WAW): Conflictos por el uso del mismo registro que no implican un flujo de datos real. Se resuelven con técnicas avanzadas.",
          "Dependencias de Control: Las instrucciones de salto (branches) determinan el flujo del programa, y hasta que no se resuelven, el procesador no sabe qué instrucciones buscar a continuación."
        ],
        diagrams: [
          "/images/temas/procesadores-superescalares/dependencies.png"
        ]
      }
    ],
    references: [
      "Basado en los principios generales de la arquitectura superescalar."
    ]
  },

  "superescalares-implementacion": {
    slug: "superescalares-implementacion",
    title: "Implementación de Procesadores Superescalares",
    description: "Técnicas avanzadas de hardware como la ejecución fuera de orden, el renombramiento de registros y la predicción de saltos, que son esenciales para el funcionamiento eficiente de las arquitecturas superescalares.",
    sections: [
      {
        id: "ejecucion-fuera-de-orden",
        title: "Ejecución Fuera de Orden (Out-of-Order Execution - OoOE)",
        content: `Es la técnica más importante para maximizar el ILP. Permite que el procesador ejecute instrucciones basándose en la disponibilidad de sus operandos y unidades funcionales, en lugar de seguir estrictamente el orden del programa. De esta forma, si una instrucción está detenida esperando un dato, el procesador puede adelantarse y ejecutar otras instrucciones posteriores que sí estén listas.`,
        keyPoints: [
          "Rompe con la ejecución secuencial estricta del programa.",
          "Utiliza una 'ventana de instrucciones' para buscar instrucciones listas para ejecutar.",
          "Aumenta la utilización de las múltiples unidades funcionales.",
          "Requiere mecanismos para reordenar los resultados y mantener la coherencia del programa."
        ],
        diagrams: [
          "/images/temas/superescalares-implementacion/ooo-execution.png",
          "/images/temas/superescalares-implementacion/instruction-window.png"
        ]
      },
      {
        id: "renombre-registros",
        title: "Renombre de Registros",
        content: `Esta técnica elimina las dependencias falsas (WAR y WAW), que ocurren cuando varias instrucciones usan el mismo registro de destino pero no tienen una dependencia real de datos. El hardware asigna dinámicamente registros físicos internos a los registros lógicos que ve el programador, deshaciendo los conflictos y permitiendo un mayor paralelismo.`,
        keyPoints: [
          "Mapea registros de arquitectura (lógicos) a un conjunto más grande de registros físicos.",
          "Elimina dependencias falsas, que limitarían la ejecución fuera de orden.",
          "El Reorder Buffer (ROB) es una estructura clave que ayuda a gestionar este proceso y a asegurar que los resultados se escriban en el orden correcto."
        ],
        diagrams: [
          "/images/temas/superescalares-implementacion/register-renaming.png",
          "/images/temas/superescalares-implementacion/reorder-buffer.png"
        ]
      },
      {
        id: "prediccion-saltos",
        title: "Predicción de Saltos (Branch Prediction)",
        content: `Para evitar que el pipeline se detenga cada vez que encuentra una instrucción de salto, los procesadores superescalares utilizan predictores de saltos. Este hardware intenta adivinar el resultado del salto (si se tomará o no) antes de que se calcule. Luego, el procesador ejecuta especulativamente las instrucciones de la ruta predicha. Si la predicción es correcta, no se pierde tiempo; si es incorrecta, se descartan los resultados y se recupera el estado correcto.`,
        keyPoints: [
          "Minimiza las paradas (stalls) causadas por riesgos de control.",
          "Utiliza hardware como el Branch Target Buffer (BTB) para almacenar historiales y predicciones.",
          "Permite la Ejecución Especulativa, manteniendo las unidades de ejecución ocupadas.",
          "Una alta tasa de aciertos en la predicción es crítica para el rendimiento."
        ],
        diagrams: [
          "/images/temas/superescalares-implementacion/branch-prediction.png",
          "/images/temas/superescalares-implementacion/btb-diagram.png"
        ]
      }
    ],
    references: [
      "Semana 4: Procesadores Superescalares - Implementación"
    ]
  },

  "procesadores-vectoriales": {
    slug: "procesadores-vectoriales",
    title: "Procesadores Vectoriales y SIMD",
    description: "Arquitecturas diseñadas para el paralelismo de datos, capaces de ejecutar una única instrucción sobre múltiples elementos de datos (SIMD), acelerando masivamente tareas científicas, gráficas y de IA.",
    sections: [
      {
        id: "introduccion",
        title: "Introducción al Procesamiento Vectorial (SIMD)",
        content: `A diferencia de los procesadores escalares que operan sobre un dato a la vez (SISD), los procesadores vectoriales funcionan bajo el principio SIMD (Single Instruction, Multiple Data). Esto significa que una sola instrucción puede realizar la misma operación (ej. una suma) sobre un conjunto completo de datos (un vector o arreglo) de forma simultánea y paralela. Esto reduce drásticamente el tiempo de cómputo para operaciones repetitivas sobre grandes volúmenes de datos.`,
        keyPoints: [
          "Opera sobre vectores o arreglos de datos, no sobre datos individuales.",
          "Implementa el paradigma de computación SIMD.",
          "Reduce el overhead de decodificación de instrucciones, ya que una instrucción hace el trabajo de muchas.",
          "Ideal para tareas con un alto nivel de paralelismo de datos."
        ],
        diagrams: [
          "/images/temas/procesadores-vectoriales/simd-concept.png",
          "/images/temas/procesadores-vectoriales/sisd-vs-simd.png"
        ]
      },
      {
        id: "arquitectura",
        title: "Arquitectura de un Procesador Vectorial",
        content: `La arquitectura vectorial está optimizada para el flujo de grandes bloques de datos. Incluye componentes especializados que no se encuentran en procesadores escalares estándar. Las GPUs modernas son un ejemplo perfecto de arquitecturas que explotan masivamente los principios del procesamiento vectorial.`,
        examples: [
          "Registros Vectoriales: Registros muy grandes capaces de almacenar vectores enteros (ej. 64 o más elementos).",
          "Unidades Funcionales en Pipeline: Múltiples ALUs y multiplicadores segmentados para procesar los elementos del vector de forma continua.",
          "Unidades Load/Store Vectoriales: Optimizadas para leer y escribir bloques contiguos de memoria (vectores) a alta velocidad.",
          "Instrucciones Vectoriales: Un conjunto de instrucciones especial (ej. VADD, VMUL) que operan sobre registros vectoriales."
        ],
        diagrams: [
          "/images/temas/procesadores-vectoriales/vpu-architecture.png",
          "/images/temas/procesadores-vectoriales/vector-registers.png"
        ]
      },
      {
        id: "aplicaciones",
        title: "Aplicaciones y Ventajas",
        content: `Gracias a su eficiencia en el manejo de operaciones masivas y repetitivas, los procesadores vectoriales son fundamentales en campos que requieren un alto rendimiento computacional.`,
        keyPoints: [
          "Computación Científica y de Ingeniería: Simulaciones, modelado del clima, análisis de elementos finitos.",
          "Procesamiento Gráfico e Imágenes: Renderizado 3D, filtros de imagen, compresión de video (las GPUs son procesadores vectoriales masivos).",
          "Inteligencia Artificial y Machine Learning: Operaciones con matrices y tensores para el entrenamiento de redes neuronales.",
          "Biología y Medicina: Secuenciación de genomas, simulaciones moleculares."
        ],
        diagrams: [
          "/images/temas/procesadores-vectoriales/applications.png"
        ]
      }
    ],
    references: [
      "Semana 5: Procesadores Vectoriales"
    ]
  },
  "introduccion": {
  slug: "introduccion",
  title: "Introducción a la Arquitectura de Computadoras",
  description: "Fundamentos de la arquitectura de computadoras, evolución histórica y conceptos básicos del diseño de sistemas computacionales modernos.",
  sections: [
    {
      id: "fundamentos",
      title: "¿Qué es la Arquitectura de Computadoras?",
      content: `La arquitectura de computadoras es la ciencia y el arte de diseñar computadoras. Abarca tanto la estructura física (hardware) como la organización lógica (software) de los sistemas computacionales. Se enfoca en entender cómo los diferentes componentes de una computadora trabajan juntos para ejecutar programas y procesar información de manera eficiente.

En esencia, la arquitectura define las capacidades y el rendimiento de un sistema computacional, determinando cómo se procesan las instrucciones, cómo se accede a la memoria y cómo los diferentes componentes se comunican entre sí.`,
      keyPoints: [
        "Define la estructura y organización de los componentes del sistema.",
        "Establece el conjunto de instrucciones (ISA - Instruction Set Architecture) que el procesador puede ejecutar.",
        "Determina cómo se comunican el CPU, memoria y dispositivos de entrada/salida.",
        "Impacta directamente en el rendimiento, consumo de energía y costo del sistema.",
        "Evoluciona constantemente para satisfacer demandas de rendimiento y eficiencia energética."
      ],
      diagrams: [
        "/images/temas/introduccion/arquitectura-basica.png"
      ]
    },
    {
      id: "componentes",
      title: "Componentes Fundamentales",
      content: `Un sistema computacional moderno se compone de varios elementos clave que trabajan en conjunto. Cada componente tiene un rol específico en el procesamiento y gestión de la información.`,
      examples: [
        "CPU (Unidad Central de Procesamiento): El cerebro de la computadora, ejecuta instrucciones y realiza cálculos.",
        "Memoria Principal (RAM): Almacena temporalmente datos y programas en ejecución para acceso rápido.",
        "Memoria Cache: Memoria ultra-rápida que almacena datos frecuentemente usados, reduciendo accesos a RAM.",
        "Unidad de Control: Coordina las operaciones del CPU, decodifica instrucciones y controla el flujo de datos.",
        "ALU (Arithmetic Logic Unit): Realiza operaciones aritméticas y lógicas sobre los datos.",
        "Registros: Almacenamiento interno del CPU, extremadamente rápido pero limitado en capacidad.",
        "Bus del Sistema: Conjunto de conexiones que transportan datos, direcciones y señales de control.",
        "Dispositivos de E/S: Permiten la interacción con el mundo exterior (teclado, disco, red, etc.)."
      ],
      diagrams: [
        "/images/temas/introduccion/componentes-sistema.png",
        "/images/temas/introduccion/jerarquia-memoria.png"
      ]
    },
    {
      id: "evolucion",
      title: "Evolución Histórica",
      content: `La arquitectura de computadoras ha evolucionado dramáticamente desde las primeras máquinas. Cada generación ha traído innovaciones que han multiplicado exponencialmente el rendimiento y reducido el tamaño y costo de los sistemas.`,
      keyPoints: [
        "Primera Generación (1940s-1950s): Computadoras basadas en tubos de vacío. Ejemplos: ENIAC, UNIVAC.",
        "Segunda Generación (1950s-1960s): Uso de transistores. Mayor fiabilidad y menor tamaño.",
        "Tercera Generación (1960s-1970s): Circuitos integrados (ICs). IBM System/360 introduce el concepto de familia de computadoras.",
        "Cuarta Generación (1970s-presente): Microprocesadores. Intel 4004 (1971) fue el primer microprocesador comercial.",
        "Era Moderna: Procesadores multinúcleo, arquitecturas de 64 bits, GPUs programables, computación heterogénea y especializada (TPUs, NPUs)."
      ],
      diagrams: [
        "/images/temas/introduccion/evolucion-procesadores.png"
      ]
    },
    {
      id: "metricas",
      title: "Métricas de Rendimiento",
      content: `Evaluar el rendimiento de un sistema computacional requiere considerar múltiples factores. No existe una sola métrica que capture completamente el rendimiento de un sistema; diferentes aplicaciones priorizan diferentes aspectos.`,
      examples: [
        "Tiempo de Ejecución (Latency): Tiempo total para completar una tarea. Menor es mejor.",
        "Throughput (Rendimiento): Cantidad de trabajo completado por unidad de tiempo. Mayor es mejor.",
        "CPI (Cycles Per Instruction): Número promedio de ciclos de reloj por instrucción ejecutada.",
        "IPC (Instructions Per Cycle): Inverso del CPI. Un IPC > 1 indica ejecución paralela de instrucciones.",
        "MIPS (Million Instructions Per Second): Millones de instrucciones por segundo (métrica menos confiable).",
        "FLOPS (Floating Point Operations Per Second): Importante en computación científica.",
        "Consumo de Energía: Crítico en dispositivos móviles y centros de datos.",
        "Eficiencia Energética: Rendimiento por vatio consumido (FLOPS/W)."
      ],
      keyPoints: [
        "El rendimiento depende del contexto: una métrica no sirve para todos los casos.",
        "La Ley de Amdahl limita la aceleración obtenible mediante paralelización.",
        "El cuello de botella puede estar en CPU, memoria, E/S o red, dependiendo de la carga.",
        "El rendimiento real de una aplicación puede diferir significativamente del rendimiento máximo teórico."
      ],
      diagrams: [
        "/images/temas/introduccion/metricas-rendimiento.png"
      ]
    },
    {
      id: "tendencias",
      title: "Tendencias Actuales",
      content: `La arquitectura de computadoras continúa evolucionando para enfrentar nuevos desafíos: el fin de la escalabilidad de Dennard, el declive de la Ley de Moore, y la demanda creciente de aplicaciones como inteligencia artificial, big data y computación en la nube.`,
      keyPoints: [
        "Procesadores Multinúcleo: Incrementar rendimiento mediante paralelismo en lugar de frecuencias más altas.",
        "Arquitecturas Heterogéneas: Combinar diferentes tipos de núcleos (CPUs, GPUs, aceleradores especializados).",
        "Computación Especializada: Aceleradores para IA (TPUs, NPUs), criptografía, procesamiento de video.",
        "Memoria de Alta Capacidad: HBM (High Bandwidth Memory), 3D stacking, memoria persistente.",
        "Eficiencia Energética: Diseños de bajo consumo (ARM), gestión dinámica de energía.",
        "Computación Cuántica: Paradigma emergente para problemas específicos.",
        "Seguridad en Hardware: Protecciones contra Spectre, Meltdown y otros ataques de canal lateral."
      ],
      diagrams: [
        "/images/temas/introduccion/tendencias-futuro.png"
      ]
    }
  ],
  references: [
    "Semana 1: Introducción a la Arquitectura de Computadoras",
    "Computer Architecture: A Quantitative Approach - Hennessy & Patterson",
    "Computer Organization and Design - Patterson & Hennessy"
  ]
},
};

// Helper function para obtener teoría por slug
export function getTheoryBySlug(slug: string): TheoryContent | undefined {
  return theoryData[slug];
}
