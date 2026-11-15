import test from 'node:test';import assert from 'node:assert/strict';
import {cloudinaryUploadSettings as settings,mpegPlaybackUrl} from '../lib/cloudinary/media-upload.js';
const url='https://res.cloudinary.com/demo/video/upload/v123/folder/asset.mpeg';
test('MPEG selectable for music and video, preserving size and resource type',()=>{
 for(const kind of ['audio','video']){assert.ok(settings[kind].accept.includes('.mpeg'));assert.equal(settings[kind].resourceType,'video')}
 assert.equal(settings.audio.max,25*1024*1024);assert.equal(settings.video.max,150*1024*1024);
});
test('MPEG playback uses Cloudinary transcoding without changing original public ID',()=>{
 assert.equal(mpegPlaybackUrl(url,{name:'Canción.MPEG'},'audio'),'https://res.cloudinary.com/demo/video/upload/f_mp3/v123/folder/asset.mp3');
 assert.equal(mpegPlaybackUrl(url,{name:'Recuerdo.mpg'},'video'),'https://res.cloudinary.com/demo/video/upload/f_mp4,vc_h264,ac_aac/v123/folder/asset.mp4');
 assert.equal(mpegPlaybackUrl(url,{name:'song.mp3'},'audio'),url);
 assert.equal(mpegPlaybackUrl('https://example.com/file.mpeg',{name:'file.mpeg'},'audio'),'https://example.com/file.mpeg');
});
