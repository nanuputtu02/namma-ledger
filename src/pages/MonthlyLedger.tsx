import {useEffect, useState} from 'react';
import {getData, getMonthlyLedger, MONTHS, blankAmounts, saveMonthlyLedger, clearMonthlyLedger} from '../services/storage';
import {CATEGORIES} from '../types';
import {formatINR, monthlyTotal, parsePaise} from '../utils/format';
import {Icon} from '../components/Icon';

export default function MonthlyLedger(){
 const [data,setData]=useState(getData()); const [fyId,setFyId]=useState(data.settings.selectedFinancialYearId); const [monthKey,setMonthKey]=useState(data.settings.selectedMonthKey); const [amounts,setAmounts]=useState(getMonthlyLedger(fyId,monthKey)?.amounts??blankAmounts()); const [saved,setSaved]=useState(false);
 useEffect(()=>{setAmounts(getMonthlyLedger(fyId,monthKey)?.amounts??blankAmounts())},[fyId,monthKey]);
 const fy=data.financialYears.find(f=>f.id===fyId)!; const month=MONTHS.find(m=>m.key===monthKey)!; const total=monthlyTotal(amounts);
 const save=()=>{const old=getMonthlyLedger(fyId,monthKey);saveMonthlyLedger({id:old?.id??`ledger-${monthKey}`,financialYearId:fyId,monthKey,monthLabel:month.label,ownerId:'puttu',amounts,updatedAt:new Date().toISOString()});setData(getData());setSaved(true);setTimeout(()=>setSaved(false),1500)};
 const clear=()=>{clearMonthlyLedger(fyId,monthKey);setAmounts(blankAmounts());setData(getData())};
 return <><div className="page-heading-row"><div><span className="eyebrow">MONTHLY LEDGER</span><h1>Manage the month.</h1><p>Enter and update the amounts you manage. CHITS directly represents the House Fund.</p></div></div><section className="card ledger-page-card"><div className="period-controls"><label>Financial Year<select value={fyId} onChange={e=>setFyId(e.target.value)}>{data.financialYears.map(f=><option key={f.id} value={f.id}>{f.name}</option>)}</select></label><label>Month<select value={monthKey} onChange={e=>setMonthKey(e.target.value)}>{MONTHS.map(m=><option key={m.key} value={m.key}>{m.label}</option>)}</select></label></div><div className="ledger-grid big">{CATEGORIES.map(cat=><label className="money-field" key={cat}><span>{cat}</span><div><b>₹</b><input inputMode="decimal" value={amounts[cat]?String(amounts[cat]/100):''} placeholder="0.00" onChange={e=>{const p=parsePaise(e.target.value);if(p!==null)setAmounts(a=>({...a,[cat]:p}))}}/></div></label>)}</div><div className="total-strip"><div><b>TOTAL</b><small>PG + CHITS + PPF + CHINNU + EXPENSE + PUTTU</small></div><strong>{formatINR(total)}</strong></div><div className="ledger-actions"><button className="primary-btn" onClick={save}><Icon name="ledger" size={18}/> Save entries</button><button className="ghost-btn" onClick={clear}><Icon name="refresh" size={18}/> Clear entries</button>{saved&&<span className="save-ok">✓ Saved locally</span>}</div></section></>;
}
