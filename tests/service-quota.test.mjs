import test from 'node:test';
import assert from 'node:assert/strict';
import {apiError,UnauthorizedError,ValidationError} from '../lib/errors.js';

test('exhausted service quota returns a retryable response without provider details',async()=>{
 for(const code of [8,'8','RESOURCE_EXHAUSTED','resource-exhausted']){
  const response=apiError(Object.assign(new Error('private database details'),{code}));
  assert.equal(response.status,503);
  const body=await response.json();assert.equal(body.code,'service_temporarily_unavailable');assert.ok(!JSON.stringify(body).includes('private database'));
 }
});
test('authentication and validation errors keep their existing statuses',async()=>{
 const auth=apiError(new UnauthorizedError());assert.equal(auth.status,401);assert.equal((await auth.json()).code,'unauthorized');
 const validation=apiError(new ValidationError('Revisa el nombre'));assert.equal(validation.status,400);assert.equal((await validation.json()).error,'Revisa el nombre');
});
