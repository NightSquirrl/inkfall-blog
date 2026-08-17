import { I18nKey } from "@/i18n/i18nKey";

export const navigationConfig = [
  { labelKey: I18nKey.navigationHome, href: "/", icon: "home" },
  { labelKey: I18nKey.navigationFrontEnd, href: "/frontend", icon: "code" },
  { labelKey: I18nKey.navigationOps, href: "/ops", icon: "terminal" },
  { labelKey: I18nKey.navigationBackEnd, href: "/backend", icon: "server" },
  { labelKey: I18nKey.navigationAbout, href: "/about", icon: "user" },
] as const;
