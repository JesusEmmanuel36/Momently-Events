import test from 'node:test';
import assert from 'node:assert/strict';
import {eventListItem,eventListCounts,filterEventList} from '../lib/admin/event-list.js';
const events=Array.from({length:147},(_,index)=>eventListItem('event-'+index,{slug:'evento-'+index,status:index<120?'published':index<140?'draft':'archived',createdAt:{toMillis:()=>index},publicData:{eventTitle:index===2?'María y Nicolás':'Evento '+index,weddingDate:{iso:'2026-12-26T18:00:00-06:00'}}}));
test('Counts cover more than 100 events and do not change when searching',()=>{
 assert.deepEqual(eventListCounts(events),{total:147,published:120,draft:20,archived:7});
 assert.equal(filterEventList(events,'evento-146').length,1);
 assert.equal(filterEventList(events,'','archived').length,7);
 assert.equal(eventListCounts(events).total,147);
});
test('Search handles accents, multiple words, slugs and dates across the complete list',()=>{
 assert.equal(filterEventList(events,'maria nicolas')[0].id,'event-2');
 assert.equal(filterEventList(events,'2026-12-26','draft').length,20);
 assert.equal(filterEventList(events,'  NICOLÁS  ')[0].id,'event-2');
 assert.equal(filterEventList(events,'inexistente').length,0);
});
test('Projection exposes only listing metadata, including events with no createdAt or title',()=>{
 const result=eventListItem('old',{slug:'antiguo',publicData:{couple:{partner1:'Ana',partner2:'Luis'},aiDesign:{secret:'large markup'}},ownerUids:['private'],settings:{secret:'private'}});
 assert.equal(result.title,'Ana & Luis');assert.equal(result.createdAt,0);assert.equal(result.publicPath,'/eventos/antiguo');
 assert.equal(result.publicData,undefined);assert.equal(result.settings,undefined);assert.equal(result.ownerUids,undefined);
 assert.equal(eventListItem('empty',{}).title,'Invitación');
});
