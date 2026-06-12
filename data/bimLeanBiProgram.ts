export type BimLeanBiUnit = {
  title: string;
  hours: number;
  capsules: string[];
  workshop: {
    title: string;
    description: string;
    aiUse: string;
  };
};

export type BimLeanBiModule = {
  id: string;
  title: string;
  shortTitle: string;
  hours: number;
  level: string;
  focus: string;
  question: string;
  objective: string;
  deliverable: string;
  finalWork: string;
  skills: string[];
  competencies: string[];
  certificationCriterion: string;
  tools: string[];
  units: BimLeanBiUnit[];
};

export const bimLeanBiProgram = {
  id: "AEC-DIP-BIM-LEAN-BI-90H",
  programId: "AEC-PROG-BIM-LEAN-BI",
  name: "Diplomado Internacional BIM, Lean y BI aplicado al Seguimiento y Control de Obra",
  shortName: "BIM, Lean, BI e IA para Control de Obra",
  claim: "Planificar. Automatizar. Integrar. Decidir con datos.",
  promise:
    "Aprende a controlar obra con trazabilidad, modelos BIM, CDE, Lean Construction, dashboards ejecutivos, Autodesk Forma e IA aplicada a seguimiento real.",
  hours: 90,
  format: "En vivo",
  practicalMix: "70% practico / 30% estrategico",
  schedule: "Martes y jueves 7:30 p.m. - 10:30 p.m.; talleres segun cronograma oficial",
  publicPath: "/diplomados/bim-lean-bi/",
  masterclassUrl: "https://apalpan.github.io/aecode-startup-cockpit/masterclass-bim-lean-bi/#/7",
  ctaUrl: "https://aecode.ai",
  audience: [
    "Ingenieros civiles",
    "Arquitectos",
    "Coordinadores BIM",
    "Supervisores y residentes de obra",
    "Oficina tecnica, planificacion y control",
    "Gestores y gerentes de proyectos"
  ],
  metrics: [
    { value: "90h", label: "en vivo para practicar, integrar y validar entregables" },
    { value: "3+1", label: "modulos troncales mas integracion final evaluable" },
    { value: "4", label: "trabajos finales de modulo para certificar progreso" },
    { value: "3/4", label: "modulos aprobados como minimo para certificacion global" }
  ],
  academicStructure: {
    label: "3 modulos troncales + 1 modulo integrador",
    description:
      "El diplomado se organiza en tres bloques academicos principales y un bloque final de integracion. Cada bloque cierra con un trabajo final evaluable.",
    globalCertificationRule:
      "Para obtener la certificacion global, el participante debe aprobar por lo menos 3 de los 4 modulos evaluables y presentar evidencia verificable.",
    moduleCertificationRule:
      "Cada modulo se valida con asistencia, participacion en taller, trabajo final de modulo y revision por rubrica AECODE."
  },
  problems: [
    {
      title: "Informacion fragmentada",
      description: "Planos, RFIs, cronogramas, metrados, incidencias y avances quedan en sistemas separados."
    },
    {
      title: "BIM sin operacion",
      description: "El modelo existe, pero no siempre alimenta control de avance, costos, restricciones o reportes."
    },
    {
      title: "Reportes manuales",
      description: "El equipo pierde tiempo armando informes en vez de interpretar desviaciones y decidir acciones."
    },
    {
      title: "Poca trazabilidad",
      description: "Sin CDE, datos y evidencias, el control depende de reuniones, memoria y archivos sueltos."
    }
  ],
  participantRoute: [
    "Diagnostico inicial",
    "Planificacion BIM + Lean",
    "Coordinacion CDE",
    "Control con modelos",
    "Dashboard BI",
    "IA + automatizacion",
    "Evidencia aplicada",
    "Certificacion"
  ],
  modules: [
    {
      id: "m01",
      title: "Marcos Colaborativos, BIM, Lean y VDC",
      shortTitle: "Marcos BIM Lean VDC",
      hours: 15,
      level: "Base estrategica",
      focus: "Planificacion colaborativa",
      question: "Como convertir metodologia en control real de obra desde el inicio?",
      objective:
        "Construir criterio metodologico para planificar, coordinar y controlar obra usando BIM, Lean Construction y VDC.",
      deliverable: "Cronograma + matriz POP + primera version de BEP aplicado a un caso real.",
      finalWork: "BEP inicial de obra + matriz POP + mapa de compromisos ICE para un caso aplicado.",
      skills: ["Gobernanza BIM", "Planificacion Lean", "Coordinacion VDC", "Minutas y compromisos ICE"],
      competencies: [
        "Define roles y flujos de informacion bajo ISO 19650.",
        "Convierte restricciones y compromisos en acciones trazables.",
        "Explica el valor BIM Lean con lenguaje entendible para obra y gerencia."
      ],
      certificationCriterion: "Aprobado con BEP coherente, matriz POP completa y compromisos accionables.",
      tools: ["ISO 19650", "Guia BIM Peru", "Last Planner System", "VDC", "Matriz POP", "ChatGPT"],
      units: [
        {
          title: "ISO 19650, roles BIM, BEP y flujos colaborativos",
          hours: 5,
          capsules: [
            "Que cambia cuando BIM se usa en construccion y no solo en diseno.",
            "Roles, responsabilidades y flujos de informacion bajo ISO 19650.",
            "Estructura minima de un BEP de obra.",
            "Criterios para ordenar entregables, versiones y aprobaciones.",
            "Errores frecuentes al implementar BIM sin gobernanza."
          ],
          workshop: {
            title: "Copiloto BEP",
            description: "Crear la estructura inicial de un BEP con roles, flujos, entregables y reglas de informacion.",
            aiUse: "IA como copiloto documental para acelerar borradores y detectar vacios."
          }
        },
        {
          title: "Lean Construction, Last Planner System y trenes de trabajo",
          hours: 5,
          capsules: [
            "Principios Lean aplicados a produccion en obra.",
            "Last Planner System: plan maestro, lookahead, plan semanal y PPC.",
            "Restricciones: tipo, causa, responsable, fecha y criticidad.",
            "Trenes de trabajo y lineas de balance.",
            "Como conectar Lean con modelos y tableros de control."
          ],
          workshop: {
            title: "Clasificador IA de restricciones",
            description: "Transformar un listado de restricciones en causas, responsables, prioridades y alertas.",
            aiUse: "IA para clasificar, priorizar y redactar acciones de seguimiento."
          }
        },
        {
          title: "VDC, matriz POP, ICE y coordinacion",
          hours: 5,
          capsules: [
            "Diferencia entre BIM, VDC e IPD.",
            "Matriz POP: producto, organizacion y proceso.",
            "Sesiones ICE y toma de decisiones colaborativa.",
            "Metricas controlables y objetivos de produccion.",
            "Mapa de coordinacion desde diseno hasta obra."
          ],
          workshop: {
            title: "Minuta ICE asistida",
            description: "Convertir una reunion de coordinacion en acuerdos, responsables, riesgos y proximos pasos.",
            aiUse: "IA para resumir, estructurar compromisos y preparar seguimiento."
          }
        }
      ]
    },
    {
      id: "m02",
      title: "BIM + Lean para Control y Seguimiento",
      shortTitle: "Control BIM Lean",
      hours: 42,
      level: "Operacion de obra",
      focus: "CDE, modelos y trazabilidad",
      question: "Como conectar documentos, modelos, incidencias y avance en un flujo controlable?",
      objective:
        "Implementar un flujo de control con BEP, CDE, documentacion, modelos, incidencias, programacion y seguimiento operativo.",
      deliverable: "Flujo CDE + modelo coordinado + control de avance con datos integrados.",
      finalWork: "Flujo CDE operativo + modelo preparado para control + matriz de incidencias y avance.",
      skills: ["CDE operativo", "Control documental", "Modelado para seguimiento", "4D/5D y coordinacion", "Reporte semanal"],
      competencies: [
        "Organiza documentos, RFIs y submittals con trazabilidad.",
        "Prepara modelos BIM para extraer datos utiles de avance, costo e incidencias.",
        "Prioriza interferencias, restricciones y pendientes para reuniones de obra."
      ],
      certificationCriterion: "Aprobado con flujo CDE documentado, modelo trazable y reporte operativo entendible.",
      tools: ["Autodesk Construction Cloud", "Trimble Connect", "Revit", "Navisworks", "Presto", "Fieldwire", "ChatGPT"],
      units: [
        {
          title: "BEP de obra y flujos ISO 19650",
          hours: 7,
          capsules: [
            "Alcance BIM para etapa de construccion.",
            "Estructura de informacion por frente, disciplina y responsable.",
            "Codificacion, nomenclatura y estados de aprobacion.",
            "Flujos de revision, emision y control de cambios.",
            "BEP como contrato operativo de informacion."
          ],
          workshop: {
            title: "BEP operativo de obra",
            description: "Construir un BEP con flujo de aprobacion, matriz de roles y entregables por fase.",
            aiUse: "IA para revisar consistencia, lenguaje y huecos operativos del BEP."
          }
        },
        {
          title: "CDE con ACC y Trimble Connect",
          hours: 7,
          capsules: [
            "Que es un entorno comun de datos y que problema resuelve.",
            "Estructura de carpetas, permisos y control documental.",
            "ACC Docs, Build, Takeoff, Model Coordination y Design Collaboration.",
            "Trimble Connect para visualizacion, tareas e incidencias.",
            "Criterios para que el CDE sirva a campo, oficina tecnica y gerencia."
          ],
          workshop: {
            title: "Auditor IA de documentacion",
            description: "Detectar documentos faltantes, duplicados, mal codificados o sin responsable.",
            aiUse: "IA para revisar listados documentales exportados y sugerir correcciones."
          }
        },
        {
          title: "RFIs, submittals, transmittals y punchlist",
          hours: 7,
          capsules: [
            "RFI como senal temprana de riesgo tecnico.",
            "Submittals y transmittals como control de aprobaciones.",
            "Punchlist y cierre de observaciones.",
            "Indicadores: vencidos, criticidad, especialidad, responsable y SLA.",
            "Como convertir gestion documental en tablero de decisiones."
          ],
          workshop: {
            title: "Resumen inteligente de RFIs",
            description: "Priorizar RFIs por impacto, vencimiento, especialidad y riesgo para la reunion semanal.",
            aiUse: "IA para sintetizar grandes listados y preparar recomendaciones de seguimiento."
          }
        },
        {
          title: "Revit para control, parametros y extraccion de datos",
          hours: 7,
          capsules: [
            "Modelo BIM como base de datos de obra.",
            "Parametros utiles para avance, sectorizacion, metrados y costo.",
            "Tablas, filtros y exportacion de datos.",
            "Preparacion del modelo para BI y control.",
            "Criterios de calidad minima para que el modelo reporte bien."
          ],
          workshop: {
            title: "Checklist IA de parametros BIM",
            description: "Evaluar si un modelo tiene los campos necesarios para control de avance y metrados.",
            aiUse: "IA para proponer estructura de parametros, nombres y reglas de validacion."
          }
        },
        {
          title: "Navisworks 4D/5D e interferencias",
          hours: 7,
          capsules: [
            "Coordinacion de modelos por disciplina.",
            "Clash detection y criterios de severidad.",
            "Simulacion 4D vinculada al cronograma.",
            "Control 5D y relacion con costos.",
            "Reporte de interferencias para decisiones de obra."
          ],
          workshop: {
            title: "Matriz IA de interferencias",
            description: "Clasificar clashes por severidad, disciplina, frente, responsable y accion recomendada.",
            aiUse: "IA para transformar reportes extensos en prioridades de coordinacion."
          }
        },
        {
          title: "Presto, Fieldwire y Lean digital",
          hours: 7,
          capsules: [
            "Control de costos y metrados con herramientas conectables.",
            "Seguimiento de campo e incidencias con Fieldwire.",
            "Lineas de produccion, restricciones y avance fisico.",
            "Integracion entre avance, costo, calidad y productividad.",
            "Reporte semanal como producto operativo."
          ],
          workshop: {
            title: "Reporte semanal asistido",
            description: "Convertir avance, restricciones, incidencias y riesgos en un informe ejecutivo accionable.",
            aiUse: "IA para redactar lectura gerencial desde datos estructurados."
          }
        }
      ]
    },
    {
      id: "m03",
      title: "BIM, Lean y Business Intelligence",
      shortTitle: "BI para obra",
      hours: 21,
      level: "Decision con datos",
      focus: "Dashboards y visual management",
      question: "Como transformar datos de obra en tableros que ayuden a decidir?",
      objective:
        "Modelar, limpiar, conectar y visualizar datos de obra para seguimiento ejecutivo, operativo y tecnico.",
      deliverable: "Dashboard BIM de obra con avance, costos, incidencias, productividad y lectura ejecutiva.",
      finalWork: "Dashboard Power BI conectado a datos BIM/CDE con lectura ejecutiva y acciones sugeridas.",
      skills: ["Arquitectura de datos", "Power Query", "DAX aplicado", "Dashboard BIM", "Visual management"],
      competencies: [
        "Estructura datos de obra para evitar tableros fragiles.",
        "Construye KPIs de avance, costo, RFIs, restricciones y productividad.",
        "Presenta informacion tecnica como decisiones claras para gerencia y obra."
      ],
      certificationCriterion: "Aprobado con dashboard funcional, modelo de datos consistente y narrativa ejecutiva.",
      tools: ["Power BI", "Power Query", "DAX", "ACC", "Revit", "Speckle", "Looker Studio"],
      units: [
        {
          title: "Arquitectura de datos, Power Query y DAX",
          hours: 7,
          capsules: [
            "Fuentes de datos en obra: modelo, CDE, plan, campo y costos.",
            "Modelos dimensionales para tiempo, costo, avance y disciplina.",
            "Limpieza y transformacion con Power Query.",
            "Medidas DAX para avance, PPC, vencidos y productividad.",
            "Buenas practicas para evitar tableros fragiles."
          ],
          workshop: {
            title: "Diccionario IA de datos de obra",
            description: "Definir campos, fuentes, responsables, frecuencia y uso de cada dato clave.",
            aiUse: "IA para estandarizar nombres, detectar duplicidad y proponer reglas de calidad."
          }
        },
        {
          title: "Dashboards Power BI conectados a BIM, ACC y avance",
          hours: 7,
          capsules: [
            "Estructura de dashboard gerencial, operativo y tecnico.",
            "KPIs de avance fisico, costo, RFIs, submittals y restricciones.",
            "Visuales utiles: no decorar, decidir.",
            "Filtros por sector, disciplina, responsable y fecha.",
            "Publicacion y actualizacion en entornos colaborativos."
          ],
          workshop: {
            title: "Analista IA de dashboards",
            description: "Generar una lectura ejecutiva del tablero con alertas, desvio y acciones sugeridas.",
            aiUse: "IA para convertir KPIs en interpretacion y prioridades de gestion."
          }
        },
        {
          title: "Visual Management, Speckle, Looker Studio y reportes",
          hours: 7,
          capsules: [
            "Visual management para reuniones de produccion.",
            "Integracion Revit + Speckle + Power BI.",
            "Looker Studio y reportes web como capa de comunicacion.",
            "Dashboards por audiencia: gerencia, obra, cliente y oficina tecnica.",
            "Storytelling tecnico para explicar estado, riesgo y accion."
          ],
          workshop: {
            title: "Narrador IA de reportes",
            description: "Transformar datos del dashboard en resumen para gerencia, obra y cliente.",
            aiUse: "IA para redactar versiones del reporte segun audiencia sin perder trazabilidad."
          }
        }
      ]
    },
    {
      id: "m04",
      title: "Modulo Integrador: IA, Automatizacion y Evidencia Final",
      shortTitle: "Integracion final",
      hours: 12,
      level: "Cierre certificable",
      focus: "IA, Autodesk Forma, automatizacion y evidencia",
      question: "Como cerrar el diplomado con un sistema integrado, entendible y verificable?",
      objective:
        "Integrar asistentes, automatizaciones, Autodesk Forma, evidencia visual y reporte web para presentar un caso final de seguimiento de obra.",
      deliverable: "Asistente IA + reporte web integrado + expediente final de evidencias para certificacion global.",
      finalWork: "Caso final BIM + Lean + BI + IA con reporte web, dashboard, evidencia y defensa tecnica.",
      skills: ["Asistente IA de obra", "Automatizacion de alertas", "Autodesk Forma", "Evidencia visual", "Reporte web final"],
      competencies: [
        "Disena flujos IA con control humano y trazabilidad.",
        "Conecta alertas, datos, evidencias y reporte ejecutivo sin duplicar informacion.",
        "Defiende un caso final integrando metodologia, herramientas y decisiones."
      ],
      certificationCriterion: "Aprobado con caso final sustentado, evidencia completa y reporte claro para decision.",
      tools: ["ChatGPT", "n8n", "Zapier", "APIs", "Autodesk Forma", "RA/RV", "Nubes de puntos", "Power BI"],
      units: [
        {
          title: "Asistentes IA para obra y oficina tecnica",
          hours: 3,
          capsules: [
            "Casos de uso: RFIs, minutas, restricciones, reportes y consultas documentales.",
            "Diferencia entre asistente, agente y automatizacion.",
            "Como dar contexto sin exponer datos sensibles.",
            "Validacion humana y trazabilidad de respuestas.",
            "Plantilla de asistente para obra."
          ],
          workshop: {
            title: "Asistente IA de obra",
            description: "Configurar un asistente para consultar documentos, resumir RFIs y preparar minutas.",
            aiUse: "IA como copiloto supervisado para acelerar oficina tecnica."
          }
        },
        {
          title: "Automatizacion con n8n, Zapier, APIs y alertas",
          hours: 3,
          capsules: [
            "Mapa de flujo: formulario, base, dashboard, alerta y reporte.",
            "Cuando usar Zapier, n8n o integracion por API.",
            "Alertas por vencimiento, riesgo, responsable y criticidad.",
            "Criterios de seguridad y fallback humano.",
            "Automatizacion minima viable para una cohorte o proyecto."
          ],
          workshop: {
            title: "Agente de seguimiento",
            description: "Disenar un flujo que detecta pendientes, redacta alerta y escala al responsable.",
            aiUse: "IA para clasificar intenciones y redactar mensajes de seguimiento."
          }
        },
        {
          title: "Autodesk Forma, RA/RV, escaneo 3D y nubes de puntos",
          hours: 3,
          capsules: [
            "Autodesk Forma para exploracion temprana, contexto y decisiones iniciales.",
            "RA/RV para visualizacion, coordinacion e induccion.",
            "Escaneo laser, fotogrametria y captura 360.",
            "Modelo BIM vs realidad capturada.",
            "Evidencia geometrica para avance, as-built y control visual."
          ],
          workshop: {
            title: "Comparacion modelo vs realidad",
            description: "Definir un flujo de evidencia con nube de puntos, fotos y modelo BIM.",
            aiUse: "IA para estructurar hallazgos y preparar reporte de diferencia."
          }
        },
        {
          title: "Reportes web e integracion final BIM + BI + IA",
          hours: 3,
          capsules: [
            "Que debe contener un reporte web de seguimiento.",
            "Estructura: resumen, KPIs, evidencias, riesgos y acciones.",
            "Integracion de dashboard, narrativa y anexos.",
            "Publicacion segura para distintas audiencias.",
            "Cierre del proyecto integrador."
          ],
          workshop: {
            title: "Reporte web final",
            description: "Unificar tablero, narrativa IA y evidencias en una vista entendible para decision.",
            aiUse: "IA para generar sintesis ejecutiva y checklist de acciones."
          }
        }
      ]
    }
  ],
  capstone: {
    title: "Proyecto integrador BIM + Lean + BI + IA",
    description:
      "El participante trabaja un caso de obra donde debe ordenar informacion, definir BEP, estructurar CDE, controlar con modelo BIM, usar datos de Autodesk Forma cuando aplique, construir dashboard y presentar un reporte asistido por IA.",
    outputs: [
      "BEP operativo",
      "Flujo CDE y matriz documental",
      "Modelo preparado para control",
      "Dashboard Power BI",
      "Reporte ejecutivo de seguimiento",
      "Asistente IA o flujo automatizado",
      "Portafolio de evidencias"
    ]
  },
  certifications: [
    {
      title: "Certificacion AECODE Training",
      detail: "Validacion de ruta, evidencias, talleres, trabajos finales de modulo y proyecto integrador."
    },
    {
      title: "Certificacion Autodesk Training Center",
      detail: "Enfoque en herramientas Autodesk aplicadas a ejecucion y control BIM."
    },
    {
      title: "Respaldo Colegio de Ingenieros del Peru",
      detail: "Reconocimiento nacional segun condiciones oficiales de la edicion."
    },
    {
      title: "Regla de aprobacion global",
      detail: "Para la certificacion global se debe aprobar por lo menos 3 de los 4 modulos evaluables."
    }
  ],
  faqs: [
    {
      question: "Necesito experiencia previa avanzada?",
      answer:
        "No. La ruta va de principiante a avanzado, pero exige practica. El valor esta en conectar metodologia, herramientas y datos."
    },
    {
      question: "Las clases quedan grabadas?",
      answer:
        "Si. El brochure indica acceso a grabaciones y materiales en plataforma para repasar y avanzar a tu ritmo."
    },
    {
      question: "Que herramientas debo preparar?",
      answer:
        "Revit, Navisworks, Autodesk Construction Cloud, Autodesk Forma, Trimble Connect, Power BI, Excel o Sheets. Algunas herramientas pueden usarse segun disponibilidad de la cohorte."
    },
    {
      question: "Como se integra la IA?",
      answer:
        "La IA aparece en talleres concretos: BEP, restricciones, RFIs, parametros BIM, interferencias, dashboards, reportes y asistentes de obra."
    },
    {
      question: "Que evidencia tendre al final?",
      answer:
        "Un portafolio con trabajos finales de modulo: BEP, flujo CDE, modelo coordinado, dashboard BI, reporte ejecutivo y asistente o automatizacion aplicada."
    },
    {
      question: "Como se aprueba la certificacion global?",
      answer:
        "Cada modulo tiene un trabajo final evaluable. Para la certificacion global debes aprobar por lo menos 3 de los 4 modulos y presentar evidencia verificable."
    },
    {
      question: "Donde se confirma inversion y matricula?",
      answer:
        "La informacion comercial debe confirmarse en canales oficiales de AECODE. Esta pagina no publica cuentas, precios ni datos sensibles."
    }
  ]
} as const;

export const bimLeanBiTotalHours = bimLeanBiProgram.modules.reduce((sum, module) => sum + module.hours, 0);
export const bimLeanBiWorkshopCount = bimLeanBiProgram.modules.reduce(
  (sum, module) => sum + module.units.length,
  0
);
