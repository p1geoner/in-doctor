import {getAllCity} from "@/app/[lang]/actions/getAllData";

const locales = getAllCity();

export const i18n = {
  defaultLocale: 'ru',
  locales: locales,
} as const
