import {useEffect, useState} from 'react';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {clearSession, getData, USERS} from '../services/storage';
import {Icon} from '../components/Icon';

const links = [
  ['/overview','home','Overview'], ['/monthly-ledger','ledger','Monthly Ledger'], ['/goals','goal','Goals'], ['/yearly-view','chart','Yearly View'], ['/settings','settings','Settings']
] as const;

export default function AppLayout({children}:{children:React.ReactNode}){
  const nav = useNavigate(); const location = useLocation(); const [open,setOpen]=useState(false); const [profileOpen,setProfileOpen]=useState(false);
  const userId = getData().session?.userId ?? 'akka'; const user = USERS.find(u=>u.id===userId)!;
  const logout=()=>{clearSession();setOpen(false);setProfileOpen(false);nav('/login');};
  useEffect(()=>{
    const onKeyDown=(event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);setProfileOpen(false);}};
    window.addEventListener('keydown',onKeyDown);
    return ()=>window.removeEventListener('keydown',onKeyDown);
  },[]);
  return <div className="app-shell">
    <aside className={`sidebar ${open?'mobile-open':''}`}>
      <div className="brand"><div className="brand-logo">N</div><div><div className="brand-name">Namma Ledger</div><div className="brand-tagline">Family • Future • Freedom</div></div></div>
      <div className="workspace-label">YOUR WORKSPACE</div>
      <nav className="nav-list">{links.map(([to,icon,label])=><NavLink key={to} to={to} onClick={()=>setOpen(false)} className={({isActive})=>`nav-item ${isActive?'active':''}`}><Icon name={icon}/><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-family-card"><div className="family-heart">♥</div><div><b>Together<br/>for a better<br/>tomorrow</b></div><span className="leaf">♧</span></div>
    </aside>
    {open&&<button className="mobile-overlay" onClick={()=>setOpen(false)} aria-label="Close navigation menu"/>}
    <main className="main-area">
      <header className="topbar">
        <button className="mobile-menu" onClick={()=>setOpen(true)} aria-label="Open navigation menu" aria-expanded={open}><Icon name="menu" size={24}/></button>
        <div className="greeting"><div className={`avatar ${user.id==='puttu'?'avatar-pink':''}`}>{user.initial}</div><div><div className="good-morning">Good afternoon,</div><div className="greeting-name">{user.name}</div><div className="motto">Keep planning, keep growing! <span>♥</span></div></div></div>
        <div className="top-actions">
          <div className="profile-wrap"><button className="profile-pill" onClick={()=>setProfileOpen(v=>!v)}><span className="profile-avatar">{user.initial}</span><span>{user.name}</span><Icon name="chevron" size={17}/></button>{profileOpen&&<div className="profile-menu"><div><b>{user.name}</b><small>Private workspace</small></div><button onClick={logout}><Icon name="logout" size={17}/> Logout</button></div>}</div>
          <button className="logout-btn" onClick={logout}><Icon name="logout" size={19}/><span>Logout</span></button>
        </div>
      </header>
      <div className="main-content">{children}</div>
    </main>
  </div>;
}
