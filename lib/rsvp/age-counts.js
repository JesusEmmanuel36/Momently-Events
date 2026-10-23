// Adultos incluye a la persona que confirma; acompañantes = total menos titular.
export const hasAgeCounts = slug => ["andrey-y-leira", "gissela-y-victor"].includes(slug);
export const maxAgeCountPeople = slug => slug === "gissela-y-victor" ? 21 : 6;
