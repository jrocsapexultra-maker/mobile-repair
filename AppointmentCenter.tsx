import React,{useState} from 'react';
type Appointment={id:string;time:string;customer:string;service:string;mode:'Drop-off'|'Mobile'|'Pickup'};
const seed:Appointment[]=[{id:'A-301','time':'10:00 AM',customer:'Andre Wilson',service:'Laptop diagnostic',mode:'Drop-off'},{id:'A-302','time':'1:30 PM',customer:'Keisha Reed',service:'Phone intake',mode:'Mobile'}];
export default function AppointmentCenter(){const [rows]=useState(seed);return <section className="panel"><h2>Appointment Dispatch</h2><p>Drop-offs, mobile service visits, pickup windows, and technician capacity.</p><div className="timeline">{rows.map(x=><article className="card" key={x.id}><b>{x.time} · {x.customer}</b><span>{x.mode}</span><small>{x.service}</small></article>)}</div></section>}
