import React from 'react';
const metrics=[['Average Cycle','2.4 days'],['First-Time Fix','91%'],['Open Value','$4,820'],['Ready Pickup','8'],['Low Stock','3'],['Approval Wait','4']];
export default function AnalyticsCenter(){return <section className="panel"><h2>Operations Analytics</h2><p>Repair throughput, approval delays, inventory risk, and financial visibility.</p><div className="command-grid">{metrics.map(([a,b])=><article className="metric" key={a}><small>{a}</small><strong>{b}</strong><span>Operational indicator</span></article>)}</div></section>}
