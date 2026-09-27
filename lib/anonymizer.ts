export type ReplacementType = "ИМЯ" | "ТЕЛЕФОН" | "EMAIL" | "ГОРОД" | "ДАТА";

export interface Replacement {
  type: ReplacementType;
  original: string;
}

export interface AnonymizeResult {
  text: string;
  replacements: Replacement[];
}

const CITIES = [
  "Москва",
  "Санкт-Петербург",
  "Новосибирск",
  "Екатеринбург",
  "Казань",
  "Нижний Новгород",
  "Самара",
  "Ростов-на-Дону",
  "Краснодар",
  "Воронеж",
  "Сочи",
  "Калининград",
  "Владивосток",
  "Минск",
  "Алматы",
];

const FIRST_NAMES = [
  "Александр",
  "Александра",
  "Алексей",
  "Анастасия",
  "Анна",
  "Артём",
  "Дмитрий",
  "Елена",
  "Иван",
  "Игорь",
  "Мария",
  "Михаил",
  "Наталья",
  "Ольга",
  "Павел",
  "Пётр",
  "Сергей",
  "Светлана",
  "Татьяна",
  "Юлия",
  "Максим",
  "Дарья",
  "Никита",
  "Полина",
];

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Ослов слова: отрезаем адъективное окончание («ий»/«ый»/«ой»),
 * затем финальную гласную или мягкий знак.
 * «Мария» → «Мари» (ловит «Марии», «Марию»), «Нижний» → «Нижн» («Нижнего»).
 */
function stemOf(word: string): string {
  if (/[иыо]й$/.test(word)) return word.slice(0, -2);
  if (/[аяь]$/.test(word)) return word.slice(0, -1);
  return word;
}

/**
 * Склоняемые слова (города, имена) матчим по основе + необязательному
 * падежному окончанию до 3 символов («его», «ой», «ии»).
 * Границы слова — через lookaround: \b в JS не работает с кириллицей.
 */
function stemPattern(word: string): RegExp {
  const pattern = word
    .split(/[\s-]/)
    .map((part) => `${escapeRegExp(stemOf(part))}[а-яё]{0,3}`)
    .join("[\\s-]");
  return new RegExp(`(?<![\\p{L}])${pattern}(?![\\p{L}])`, "giu");
}

const CITY_PATTERNS = CITIES.map(stemPattern);
const FIRST_NAME_PATTERNS = FIRST_NAMES.map(stemPattern);

// ФИО: два подряд идущих слова с заглавной буквы (в любом падеже).
const NAME_PAIR_RE = /(?<![\p{L}])[А-ЯЁ][а-яё]{1,20}\s+[А-ЯЁ][а-яё]{1,20}(?![\p{L}])/gu;

/**
 * Детерминированный клиентский анонимизатор.
 * Порядок правил важен: сначала специфичные паттерны (email, телефон, дата),
 * затем города (чтобы «Санкт-Петербург» не стал парой имён),
 * затем ФИО и отдельные имена.
 */
export function anonymize(input: string): AnonymizeResult {
  const replacements: Replacement[] = [];
  let text = input;

  const replace = (regex: RegExp, type: ReplacementType) => {
    text = text.replace(regex, (match) => {
      replacements.push({ type, original: match });
      return `[${type}]`;
    });
  };

  // Email
  replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "EMAIL");

  // Телефоны в российских форматах: +7 (912) 345-67-89, 8 912 345 67 89 и т.п.
  replace(/(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}/g, "ТЕЛЕФОН");

  // Даты ДД.ММ.ГГГГ / ДД/ММ/ГГ
  replace(/\b\d{1,2}[./]\d{1,2}[./]\d{2,4}\b/g, "ДАТА");

  // Города (регистр не важен, с падежными окончаниями)
  for (const re of CITY_PATTERNS) {
    replace(re, "ГОРОД");
  }

  // ФИО: два подряд идущих слова с заглавной буквы
  replace(NAME_PAIR_RE, "ИМЯ");

  // Отдельные имена из списка
  for (const re of FIRST_NAME_PATTERNS) {
    replace(re, "ИМЯ");
  }

  return { text, replacements };
}

export function countByType(replacements: Replacement[]): Record<string, number> {
  return replacements.reduce<Record<string, number>>((acc, r) => {
    acc[r.type] = (acc[r.type] ?? 0) + 1;
    return acc;
  }, {});
}
