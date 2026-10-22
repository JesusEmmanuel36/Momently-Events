export function invitationBackgrounds(data={}) {
 const intro=data.intro?.imageUrl || "";
 return {intro,hero:data.intro?.keepForHero && intro ? intro : data.hero?.imageUrl || ""};
}

export function introBackgroundSettings(data={}) {
 return {...data.hero,gradientEnabled:data.intro?.gradientEnabled ?? data.hero?.gradientEnabled ?? true};
}
