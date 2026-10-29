// Adultos incluye a la persona que confirma; acompañantes = total menos titular.
export const hasAgeCounts = value => typeof value === "object" && value !== null
  ? (value.templateKey === "ai-designed" ? value.settings?.rsvp?.askAgeCounts === true : hasAgeCounts(value.slug))
  : ["andrey-y-leira", "gissela-y-victor"].includes(value);
export const maxAgeCountPeople = value => typeof value === "object" && value !== null
  ? (value.templateKey === "ai-designed" ? Math.min(21,Math.max(1,Number(value.settings?.rsvp?.maxCompanions ?? 5)+1)) : maxAgeCountPeople(value.slug))
  : value === "gissela-y-victor" ? 21 : 6;
