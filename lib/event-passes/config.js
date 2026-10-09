// Explicit opt-in: other events keep their existing RSVP and guest management.
export function supportsPersonalizedPasses(slug) {
  return slug === "alejandra-y-david" || slug === "joanna-y-ruben";
}
