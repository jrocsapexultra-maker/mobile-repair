export type QueuedOperation={id:string;kind:'repair'|'unlock'|'audit';createdAt:string;payload:unknown;attempts:number};
const KEY='jroc_offline_operations_v1';
function read():QueuedOperation[]{return JSON.parse(localStorage.getItem(KEY)||'[]')}
function write(rows:QueuedOperation[]){localStorage.setItem(KEY,JSON.stringify(rows))}
export const offlineQueue={
 list:read,
 enqueue:(kind:QueuedOperation['kind'],payload:unknown)=>{const row={id:crypto.randomUUID(),kind,createdAt:new Date().toISOString(),payload,attempts:0};write([...read(),row]);return row},
 remove:(id:string)=>write(read().filter(x=>x.id!==id)),
 increment:(id:string)=>write(read().map(x=>x.id===id?{...x,attempts:x.attempts+1}:x))
};
