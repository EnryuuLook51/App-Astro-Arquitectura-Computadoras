// src/data/topics.ts

import { getTopicBySlug, type Topic } from './videos';
import { getTheoryBySlug, type TheoryContent } from './theory';

export interface CompleteTopicData {
  videos: Topic | undefined;
  theory: TheoryContent | undefined;
}

/**
 * Obtiene todo el contenido de un tema: videos + teoría
 * @param unitKey - Clave de la unidad (ej: "unidad1")
 * @param slug - Slug del tema (ej: "introduccion")
 * @returns Objeto con videos y teoría del tema
 */
export function getCompleteTopicData(
  unitKey: string,
  slug: string
): CompleteTopicData {
  return {
    videos: getTopicBySlug(unitKey, slug),
    theory: getTheoryBySlug(slug)
  };
}

/**
 * Verifica si un tema tiene contenido completo
 */
export function hasCompleteContent(data: CompleteTopicData): boolean {
  return !!(data.videos && data.theory);
}

/**
 * Obtiene el título del tema desde cualquier fuente disponible
 */
export function getTopicTitle(data: CompleteTopicData): string {
  return data.videos?.name || data.theory?.title || 'Tema sin título';
}
