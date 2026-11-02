// A slug identifies an invitation even when the design did not extract participant names.
// Keep explicit names untouched; use the slug only as a display title of last resort.
export function resolveAiEventNames({name1='',name2='',cover,slug=''}){
 const first=String(name1||'').trim(),second=String(name2||'').trim();
 if(first||second)return {name1:first,name2:second};
 const generatedFirst=String(cover?.event?.name1||'').trim(),generatedSecond=String(cover?.event?.name2||'').trim();
 if(generatedFirst||generatedSecond)return {name1:generatedFirst,name2:generatedSecond};
 const title=String(slug||'').trim().replace(/[-_]+/g,' ').replace(/\s+/g,' ').replace(/\b\p{L}/gu,letter=>letter.toLocaleUpperCase('es-MX')).slice(0,120);
 return {name1:title,name2:''};
}
