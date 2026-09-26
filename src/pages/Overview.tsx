import {useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Icon} from '../components/Icon';
import {getData, getHouseFundAccumulated, MONTHS, saveMonthlyLedger, getMonthlyLedger, blankAmounts} from '../services/storage';
import {formatINR, formatINRWhole, monthlyTotal, parsePaise, percent} from '../utils/format';
import {CATEGORIES} from '../types';

export default function Overview(){
  const nav=useNavigate(); const [data,setData]=useState(getData()); const fy=data.financialYears.find(f=>f.id===data.settings.selectedFinancialYearId)!; const [monthKey,setMonthKey]=useState(data.settings.selectedMonthKey); const month=MONTHS.find(m=>m.key===monthKey)!;
  const existing=getMonthlyLedger(fy.id,monthKey); const [amounts,setAmounts]=useState(existing?.amounts ?? blankAmounts()); const [saved,setSaved]=useState(false);
  const total=monthlyTotal(amounts); const houseAccum=getHouseFundAccumulated(); const activeGoal=data.goals.houseFundTarget>0?`House Fund`:'Grandma — Kai Ungura'; const houseProgress=percent(houseAccum,data.goals.houseFundTarget);
  const yearly=useMemo(()=>MONTHS.map(m=>({m,total:monthlyTotal(getMonthlyLedger(fy.id,m.key)?.amounts ?? blankAmounts())})),[fy.id, data]);
  const max=Math.max(1,...yearly.map(x=>x.total));
  const save=()=>{saveMonthlyLedger({id:existing?.id??`ledger-${monthKey}`,financialYearId:fy.id,monthKey,monthLabel:month.label,ownerId:'puttu',amounts,updatedAt:new Date().toISOString()});setData(getData());setSaved(true);setTimeout(()=>setSaved(false),1800);};
  const clear=()=>{setAmounts(blankAmounts());};
  const changeMonth=(key:string)=>{setMonthKey(key);setAmounts(getMonthlyLedger(fy.id,key)?.amounts??blankAmounts());};
  return <>
    <div className="page-heading-row"><div><h1>Overview</h1><p>Here's a quick view of your family's financial journey.</p></div><select className="month-select" value={monthKey} onChange={e=>changeMonth(e.target.value)}>{MONTHS.map(m=><option key={m.key} value={m.key}>{m.label}</option>)}</select></div>
    <div className="summary-grid">
      <Summary icon="wallet" tone="blue" label="Total This Month" value={formatINR(total)} foot="All six ledger categories"/>
      <div className="summary-card pink-card"><div className="summary-icon pink-icon"><Icon name="goal" size={24}/></div><div className="summary-label">Active Goal</div><strong>{activeGoal}</strong><div className="summary-mini">{formatINR(houseAccum)} / {formatINR(data.goals.houseFundTarget)}</div><div className="mini-progress"><i style={{width:`${houseProgress}%`}}/></div><span className="progress-label">{houseProgress}%</span></div>
      <Summary icon="calendar" tone="blue" label="Financial Year" value={fy.name} foot="12 months · Sep to Aug"/>
      <Summary icon="users" tone="pink" label="Workspace" value={`Private (${data.session?.userId==='puttu'?'Puttu':'Akka'})`} foot="Managing Puttu's ledger ♥"/>
    </div>
    <div className="dashboard-two-col">
      <section className="card ledger-card">
        <div className="card-header"><div><div className="card-title-line"><Icon name="calendar" size={24}/><h2>Monthly Ledger</h2></div><p>Enter and update the amounts you manage.</p></div><span className="period-chip">{month.label}</span></div>
        <div className="ledger-grid">{CATEGORIES.map(cat=><MoneyField key={cat} label={cat} value={amounts[cat]} onChange={v=>setAmounts(a=>({...a,[cat]:v}))}/>)}</div>
        <div className="total-strip"><div><b>TOTAL</b><small>This total includes only the values you have entered.</small></div><strong>{formatINR(total)}</strong></div>
        <div className="ledger-actions"><button className="primary-btn" onClick={save}><span>▣</span> Save entries</button><button className="ghost-btn" onClick={clear}><Icon name="refresh" size={18}/> Clear all</button>{saved&&<span className="save-ok">✓ Saved locally</span>}</div>
      </section>
      <div className="right-stack">
        <section className="card goals-preview"><div className="card-header"><div><div className="card-title-line"><Icon name="goal" size={24}/><h2>Goals</h2></div><p>Plan for what matters. Targets are shared within your workspace.</p></div><button className="pink-btn" onClick={()=>nav('/goals')}>View all goals <Icon name="arrow" size={16}/></button></div><div className="goal-preview-card"><div className="preview-goal-title"><span>♥</span><div><b>Grandma — Kai Ungura</b><p>An independent personal goal, separate from the monthly ledger.</p></div><em>Personal</em></div><div className="goal-stats"><div><small>Target</small><b>{formatINR(data.goals.grandmaKaiUnguraTarget)}</b></div><div><small>Accumulated</small><b>{formatINR(data.goals.grandmaKaiUnguraAccumulated)}</b></div><div><small>Remaining</small><b>{formatINR(Math.max(0,data.goals.grandmaKaiUnguraTarget-data.goals.grandmaKaiUnguraAccumulated))}</b></div></div><div className="progress-row"><div className="progress"><i style={{width:`${percent(data.goals.grandmaKaiUnguraAccumulated,data.goals.grandmaKaiUnguraTarget)}%`}}/></div><b>{percent(data.goals.grandmaKaiUnguraAccumulated,data.goals.grandmaKaiUnguraTarget)}%</b></div></div></section>
        <section className="card yearly-preview"><div className="card-header"><div><div className="card-title-line"><Icon name="chart" size={24}/><h2>Yearly View</h2></div><p>See the monthly amounts you have entered throughout the financial year.</p></div><button className="light-btn" onClick={()=>nav('/yearly-view')}>View details <Icon name="arrow" size={16}/></button></div><div className="bar-chart">{yearly.map(({m,total:t})=><div className="bar-col" key={m.key}><div className="bar-value">{t?formatINRWhole(t):''}</div><div className="bar-track"><i style={{height:`${Math.max(2,t/max*100)}%`}}/></div><span>{m.short}</span></div>)}</div></section>
      </div>
    </div>
    <div className="bottom-feature-grid"><Feature icon="users" title="Shared Purpose" text="Manage today. Build tomorrow. Together."/><Feature icon="goal" title="Family First" text="A stronger tomorrow for the people who matter." pink/><Feature icon="chart" title="Financial Freedom" text="Plan • Save • Grow"/></div>
  </>;
}
function Summary({icon,tone,label,value,foot}:{icon:string;tone:'blue'|'pink';label:string;value:string;foot:string}){return <div className={`summary-card ${tone==='pink'?'pink-card':''}`}><div className={`summary-icon ${tone==='pink'?'pink-icon':''}`}><Icon name={icon} size={24}/></div><div className="summary-label">{label}</div><strong>{value}</strong><small>{foot}</small></div>}
function MoneyField({label,value,onChange}:{label:string;value:number;onChange:(v:number)=>void}){return <label className="money-field"><span>{label}</span><div><b>₹</b><input inputMode="decimal" value={value?String(value/100):''} placeholder="0.00" onChange={e=>{const p=parsePaise(e.target.value); if(p!==null) onChange(p)}}/></div></label>}
function Feature({icon,title,text,pink=false}:{icon:string;title:string;text:string;pink?:boolean}){return <div className={`feature-card ${pink?'feature-pink':''}`}><div className="feature-icon"><Icon name={icon} size={27}/></div><div><b>{title}</b><p>{text}</p></div></div>}
