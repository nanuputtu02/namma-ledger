import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {setSession, USERS} from '../services/storage';
import type {UserId} from '../types';
import {Icon} from '../components/Icon';

export default function Login(){
  const nav=useNavigate(); const [selected,setSelected]=useState<UserId>('akka');
  const submit=(e:React.FormEvent)=>{e.preventDefault();setSession(selected);nav('/overview');};
  return <div className="login-page"><div className="login-orb orb-one"/><div className="login-orb orb-two"/>
    <div className="login-panel">
      <div className="login-brand"><div className="brand-logo">N</div><div><div className="brand-name">Namma Ledger</div><div className="brand-tagline">Family • Future • Freedom</div></div></div>
      <div className="login-heading"><span>WELCOME BACK</span><h1>Your family, your future.</h1><p>A simple private space to plan, track and grow together.</p></div>
      <form onSubmit={submit}>
        <label className="field-label">Choose your profile</label>
        <div className="user-select-grid">{USERS.map(user=><button type="button" key={user.id} className={`user-option ${selected===user.id?'selected':''}`} onClick={()=>setSelected(user.id)}><span className={`login-avatar ${user.id==='puttu'?'pink':''}`}>{user.initial}</span><span><b>{user.name}</b><small>Private workspace</small></span>{selected===user.id&&<span className="selected-dot">✓</span>}</button>)}</div>
        <button className="primary-btn full-btn" type="submit">Continue to Namma Ledger <Icon name="arrow" size={18}/></button>
      </form>
      <div className="login-note"><Icon name="settings" size={17}/><span>Frontend-only prototype. Your data stays in this browser using localStorage.</span></div>
    </div>
  </div>;
}
