import {Cake,Clock3,Music2,Utensils} from 'lucide-react';
export function ItineraryIcon({name}){
 const props={size:44,strokeWidth:1.25,'aria-hidden':true};
 if(name==='food')return <Utensils {...props}/>;if(name==='clock')return <Clock3 {...props}/>;if(name==='music')return <Music2 {...props}/>;if(name==='cake')return <Cake {...props}/>;
 return <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 {name==='glasses'&&<><path d="m12 9-4 14c-1 5 8 8 10 3l5-13-11-4ZM30 9l-5 4 5 13c2 5 11 2 10-3L36 9l-6 2M13 29l-3 11m-5-1 10 3m19-13 3 11m-5 2 10-3M20 4l1 4m7-4-1 4m-3-6v5"/></>}
 {name==='couple'&&<><circle cx="16" cy="8" r="4"/><circle cx="31" cy="8" r="4"/><path d="m11 15 5-3 5 3 2 13-5-3v18h-5V25l-5 4 3-14Zm17-1 3-2 5 3 4 24H23l5-24Zm-2 1-4 10m12-10 6 10M16 13l-2 9 2 4 2-4-2-9M28 4c0-4 11-3 10 6l3 15"/></>}
 {name==='dance'&&<><circle cx="15" cy="8" r="4"/><circle cx="31" cy="10" r="4"/><path d="m13 14 7 3 8-1 7 6-7 8 10 11H20l7-13-6-6-5 5-7-5m4-8-6 7-4-4m13 9-3 10-6 8m11-17 5 10 3 7m8-24 7-8 3 3M25 16l3 12M27 7c1-6 9-5 9 0"/></>}
 {name==='bouquet'&&<><path d="m13 24 11 20 11-20M20 40l8-1M24 43l-3 3m4-3 3 3"/><circle cx="24" cy="16" r="5"/><circle cx="15" cy="13" r="5"/><circle cx="32" cy="13" r="5"/><circle cx="18" cy="6" r="4"/><circle cx="28" cy="5" r="4"/><circle cx="9" cy="20" r="4"/><circle cx="37" cy="20" r="4"/><path d="M19 28C6 28 5 23 6 21c7-1 11 2 13 7Zm10 0c13 0 14-5 13-7-7-1-11 2-13 7Z"/></>}
 {name==='disco'&&<><path d="M24 1v7"/><circle cx="24" cy="26" r="17"/><ellipse cx="24" cy="26" rx="8" ry="17"/><path d="M8 20h32M7 29h34M11 37h26M24 9v34M4 6v6M1 9h6m35-4v6m-3-3h6M44 38v6m-3-3h6"/></>}
 </svg>;
}
