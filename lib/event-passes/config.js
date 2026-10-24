// Explicit opt-in: other events keep their existing RSVP and guest management.
export function supportsPersonalizedPasses(eventOrSlug) {
  const event=typeof eventOrSlug === "object" && eventOrSlug !== null ? eventOrSlug : null;
  const slug=event ? event.slug : eventOrSlug;
  if(event && ["brown-romance","flexible-celebration","ai-designed"].includes(event.templateKey)) return event.settings?.personalizedPasses?.enabled === true;
  return slug === "luis-y-erika" || slug === "kristell-y-ricardo" || slug === "carla-y-vicente" || slug === "xv-maria-jose" || slug === "fabiola-y-cesar" || slug === "aurelio-y-yuliza" || slug === "maria-y-luis" || slug === "yoatzin-y-aldo" || slug === "xv-nathalia" || slug === "rosa-y-jacob" || slug === "rublester-y-dolores" || slug === "alejandra-y-david" || slug === "joanna-y-ruben" || slug === "xv-abigail" || slug === "xv-nahomi" || slug === "claudia-y-porfirio" || slug === "narciso-y-maritza" || slug === "xv-debanhi-betel" || slug === "bautizo-gabriel" || slug === "xv-karla-michelle" || slug === "tere-moreno" || slug === "montserrat-y-andrei";
}
