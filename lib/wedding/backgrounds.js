export function invitationBackgrounds(data={}) {
 const intro=data.intro?.imageUrl || "";
 return {intro,hero:data.intro?.keepForHero && intro ? intro : data.hero?.imageUrl || ""};
}
