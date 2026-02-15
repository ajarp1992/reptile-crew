import { useState, useEffect, useRef, createContext, useContext } from "react";

// ═══ CONFIG ═══
const SUPABASE_URL = "https://pkuzsodhtswyoxukpual.supabase.co";
const SUPABASE_KEY = "sb_publishable_2f4xDHiE4mk_F-ImzsjC2A_gNuQgO09";
const LOGO = "data:image/jpeg;base64,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";

// ═══ TRANSLATIONS ═══
const T = {
  en: {
    crewManager: "Crew Manager", welcomeBack: "Welcome back", managerPortal: "Manager Portal",
    employeeClockIn: "Employee Clock In", signIn: "Sign In", back: "Back", enterPin: "Enter your 4-digit PIN",
    invalidPin: "Invalid PIN", invalidLogin: "Invalid email or password", clockIn: "CLOCK IN", clockOut: "CLOCK OUT",
    currentlyIn: "Currently Clocked In", since: "Since", hrs: "hrs", todayLog: "Today's Log", noEntries: "No entries today",
    assignProject: "Assign to Project", selectProject: "Select Project", gpsLocked: "GPS Locked",
    gpsDenied: "GPS Denied", acquiringGps: "Acquiring GPS...", gpsError: "GPS Error",
    howToEnable: "How to enable location", tryAgain: "Try Again", home: "Home", time: "Time",
    team: "Team", projects: "Projects", schedule: "Schedule", announce: "Announce",
    clockedIn: "Clocked In", hoursToday: "Hours Today", crew: "Crew", activeJobs: "Active Jobs",
    liveCrewStatus: "Live Crew Status", onSite: "On Site", off: "Off", addEmployee: "Add Employee",
    fullName: "Full Name", pin: "PIN", role: "Role", phone: "Phone", newProject: "New Project",
    projectName: "Project Name", address: "Address", status: "Status", notes: "Notes",
    active: "active", upcoming: "upcoming", completed: "completed", files: "Files", messages: "Messages",
    allProjects: "All Projects", sendUpdate: "Send an update...", addFile: "Add File", fileName: "File Name",
    photo: "Photo", document: "Document", payPeriod: "Pay Period", edit: "Edit", save: "Save", cancel: "Cancel",
    editHours: "Edit Hours", newClockIn: "New Clock In", newClockOut: "New Clock Out", reason: "Reason for edit",
    tileSetter: "Tile Setter", apprentice: "Apprentice", flooringInstaller: "Flooring Installer", foreman: "Foreman",
    email: "Email", password: "Password", addManager: "Add Manager", managers: "Managers", owner: "Owner",
    manager: "Manager", dailyNote: "Daily Note", addNote: "Add note about today's work...",
    myHours: "My Hours", total: "Total", noHoursYet: "No hours this period",
    announcement: "Announcement", postAnnouncement: "Post Announcement", title: "Title",
    body: "Body", urgent: "Urgent", noAnnouncements: "No announcements yet",
    weekSchedule: "Week Schedule", assignCrew: "Assign Crew", unassigned: "Unassigned",
    expenses: "Expenses", addExpense: "Add Expense", amount: "Amount", description: "Description",
    category: "Category", materials: "Materials", tools: "Tools", travel: "Travel", other: "Other",
    photos: "Photos", takePhoto: "Take Photo", caption: "Caption",
    language: "Language", english: "English", spanish: "Spanish",
  },
  es: {
    crewManager: "Gestor de Equipo", welcomeBack: "Bienvenido", managerPortal: "Portal de Gerente",
    employeeClockIn: "Registro de Empleado", signIn: "Iniciar Sesion", back: "Atras", enterPin: "Ingresa tu PIN de 4 digitos",
    invalidPin: "PIN invalido", invalidLogin: "Email o contrasena invalidos", clockIn: "ENTRADA", clockOut: "SALIDA",
    currentlyIn: "Registrado Actualmente", since: "Desde", hrs: "hrs", todayLog: "Registro de Hoy", noEntries: "Sin registros hoy",
    assignProject: "Asignar a Proyecto", selectProject: "Seleccionar Proyecto", gpsLocked: "GPS Conectado",
    gpsDenied: "GPS Denegado", acquiringGps: "Adquiriendo GPS...", gpsError: "Error de GPS",
    howToEnable: "Como activar ubicacion", tryAgain: "Intentar de Nuevo", home: "Inicio", time: "Tiempo",
    team: "Equipo", projects: "Proyectos", schedule: "Horario", announce: "Avisos",
    clockedIn: "Registrados", hoursToday: "Horas Hoy", crew: "Equipo", activeJobs: "Trabajos Activos",
    liveCrewStatus: "Estado del Equipo en Vivo", onSite: "En Sitio", off: "Fuera", addEmployee: "Agregar Empleado",
    fullName: "Nombre Completo", pin: "PIN", role: "Rol", phone: "Telefono", newProject: "Nuevo Proyecto",
    projectName: "Nombre del Proyecto", address: "Direccion", status: "Estado", notes: "Notas",
    active: "activo", upcoming: "proximo", completed: "completado", files: "Archivos", messages: "Mensajes",
    allProjects: "Todos los Proyectos", sendUpdate: "Enviar actualizacion...", addFile: "Agregar Archivo", fileName: "Nombre del Archivo",
    photo: "Foto", document: "Documento", payPeriod: "Periodo de Pago", edit: "Editar", save: "Guardar", cancel: "Cancelar",
    editHours: "Editar Horas", newClockIn: "Nueva Entrada", newClockOut: "Nueva Salida", reason: "Razon del cambio",
    tileSetter: "Instalador de Azulejo", apprentice: "Aprendiz", flooringInstaller: "Instalador de Piso", foreman: "Capataz",
    email: "Correo", password: "Contrasena", addManager: "Agregar Gerente", managers: "Gerentes", owner: "Dueno",
    manager: "Gerente", dailyNote: "Nota del Dia", addNote: "Agregar nota sobre el trabajo de hoy...",
    myHours: "Mis Horas", total: "Total", noHoursYet: "Sin horas este periodo",
    announcement: "Aviso", postAnnouncement: "Publicar Aviso", title: "Titulo",
    body: "Mensaje", urgent: "Urgente", noAnnouncements: "Sin avisos aun",
    weekSchedule: "Horario Semanal", assignCrew: "Asignar Equipo", unassigned: "Sin asignar",
    expenses: "Gastos", addExpense: "Agregar Gasto", amount: "Monto", description: "Descripcion",
    category: "Categoria", materials: "Materiales", tools: "Herramientas", travel: "Viaje", other: "Otro",
    photos: "Fotos", takePhoto: "Tomar Foto", caption: "Descripcion de foto",
    language: "Idioma", english: "Ingles", spanish: "Espanol",
  }
};

const LangCtx = createContext("en");
const useT = () => { const lang = useContext(LangCtx); return T[lang] || T.en; };

// ═══ SUPABASE HELPERS ═══
const sb = {
  headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": "return=representation" },
  async get(table, query = "") { const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, { headers: sb.headers }); return r.json(); },
  async post(table, data) { const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, { method: "POST", headers: sb.headers, body: JSON.stringify(data) }); return r.json(); },
  async patch(table, id, data) { const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, { method: "PATCH", headers: sb.headers, body: JSON.stringify(data) }); return r.json(); },
  async del(table, id) { await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, { method: "DELETE", headers: sb.headers }); },
};

// ═══ BRAND ═══
const C = {
  lime: "#84CC16", limeDk: "#65A30D", limeLt: "#D9F99D",
  limeBg: "rgba(132,204,22,0.08)", limeBdr: "rgba(132,204,22,0.15)",
  bg: "#111", card: "#1c1c1c", border: "#2a2a2a", surface: "#1e1e1e",
  t1: "#f5f5f5", t2: "#999", t3: "#666",
  red: "#ef4444", redBg: "rgba(239,68,68,0.1)",
  grn: "#22c55e", grnBg: "rgba(34,197,94,0.1)",
  blu: "#3b82f6", bluBg: "rgba(59,130,246,0.1)",
  yel: "#eab308", yelBg: "rgba(234,179,8,0.1)",
};

const fmtTime = (iso) => { if (!iso) return "\u2014"; return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }); };
const fmtDateFull = (iso) => { if (!iso) return "\u2014"; return new Date(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }); };
const fmtDateShort = (iso) => { if (!iso) return "\u2014"; return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" }); };
const hrs = (a, b) => { if (!a) return "0.0"; const end = b ? new Date(b) : new Date(); return ((end - new Date(a)) / 3600000).toFixed(1); };
const badge = (color, bg) => ({ display: "inline-flex", alignItems: "center", padding: "4px 10px", borderRadius: 100, fontSize: 12, fontWeight: 600, color, background: bg });
const getPayPeriod = (date) => {
  const d = new Date(date); const day = d.getDate(); const mo = d.getMonth(); const yr = d.getFullYear();
  if (day <= 15) return { start: new Date(yr, mo, 1), end: new Date(yr, mo, 15, 23, 59, 59), label: `${d.toLocaleDateString("en-US", { month: "short" })} 1-15` };
  const lastDay = new Date(yr, mo + 1, 0).getDate();
  return { start: new Date(yr, mo, 16), end: new Date(yr, mo, lastDay, 23, 59, 59), label: `${d.toLocaleDateString("en-US", { month: "short" })} 16-${lastDay}` };
};

// ═══ ICONS ═══
const I = {
  Clock: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Users: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Folder: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  Pin: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Home: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Plus: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  X: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Out: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Send: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  File: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  Img: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Gear: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Right: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Left: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  Trash: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Msg: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Gps: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/></svg>,
  Edit: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Cal: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Bell: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Globe: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
};

// ═══ SHARED COMPONENTS ═══
const Logo = ({ h = 36 }) => <img src={LOGO} alt="Rep-Tile" style={{ height: h, width: "auto", objectFit: "contain" }} />;

const css = `*{box-sizing:border-box;margin:0;padding:0}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes pulse2{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.08);opacity:.9}}
@keyframes ping{0%{transform:scale(.8);opacity:1}100%{transform:scale(2.5);opacity:0}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
select option{background:#222;color:#f5f5f5}input::placeholder,textarea::placeholder{color:#555}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#333;border-radius:4px}`;

const inp = (f) => ({ width: "100%", padding: "13px 16px", background: C.card, border: `1px solid ${f ? C.lime : C.border}`, borderRadius: 12, color: C.t1, fontSize: 15, outline: "none", boxSizing: "border-box", transition: "border .2s", fontFamily: "inherit" });
const btn = { padding: "13px 24px", borderRadius: 12, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 600, transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit" };
const crd = { background: C.card, borderRadius: 16, padding: 18, border: `1px solid ${C.border}` };

function Inp({ label, value, onChange, placeholder, type = "text", ...r }) {
  const [f, setF] = useState(false);
  return <div style={{ marginBottom: 14 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 700, color: C.t2, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>{label}</div>}
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} onFocus={() => setF(true)} onBlur={() => setF(false)} style={inp(f)} {...r} />
  </div>;
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
    <div onClick={e => e.stopPropagation()} style={{ background: C.bg, borderRadius: "24px 24px 0 0", padding: "24px 20px 40px", width: "100%", maxWidth: 480, maxHeight: "85vh", overflowY: "auto", border: `1px solid ${C.border}`, borderBottom: "none", animation: "fadeUp .3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>{title}</h2>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.t2, padding: 4 }}><I.X s={22} /></button>
      </div>
      {children}
    </div>
  </div>;
}

// ═══ GPS HOOK ═══
function useGPS() {
  const [status, setStatus] = useState("initializing");
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const watchRef = useRef(null);

  const startGPS = () => {
    if (!navigator.geolocation) { setStatus("unavailable"); setError("Geolocation not supported"); return; }
    if (watchRef.current !== null) { navigator.geolocation.clearWatch(watchRef.current); watchRef.current = null; }
    setStatus("acquiring"); setError("");
    const onSuccess = (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      setCoords({ lat: latitude, lng: longitude, accuracy: Math.round(accuracy) }); setStatus("locked");
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`)
        .then(r => r.json()).then(data => {
          if (data?.display_name) {
            const a = data.address || {};
            const parts = [a.house_number && a.road ? `${a.house_number} ${a.road}` : a.road || "", a.city || a.town || a.village || "", a.state ? (a.state.length > 2 ? a.state.substring(0, 2).toUpperCase() : a.state) : ""].filter(Boolean);
            setAddress(parts.join(", ") || data.display_name.split(",").slice(0, 3).join(","));
          }
        }).catch(() => setAddress(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`));
    };
    const onError = (err) => { if (err.code === 1) { setStatus("denied"); setError("Location access denied"); } else if (err.code === 2) { setStatus("unavailable"); setError("Location unavailable"); } else { setStatus("timeout"); setError("Timed out"); } };
    const opts = { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, opts);
    watchRef.current = navigator.geolocation.watchPosition(onSuccess, onError, { ...opts, maximumAge: 30000 });
  };
  const retry = () => startGPS();
  useEffect(() => { startGPS(); return () => { if (watchRef.current !== null) navigator.geolocation.clearWatch(watchRef.current); }; }, []);
  return { status, coords, address, error, retry };
}

function GPSCard({ gps }) {
  const t = useT();
  const { status, coords, address, error, retry } = gps;
  const [showHelp, setShowHelp] = useState(false);
  const isLocked = status === "locked"; const needsHelp = status === "denied" || status === "unavailable";
  const isAcquiring = status === "acquiring" || status === "initializing";
  const ua = navigator.userAgent || ""; const isIOS = /iPhone|iPad/i.test(ua); const isAndroid = /Android/i.test(ua);

  return <div style={{ ...crd, marginBottom: 16, animation: "fadeUp .6s" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ position: "relative" }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: isLocked ? C.grnBg : needsHelp ? C.redBg : C.limeBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {isAcquiring ? <div style={{ animation: "spin 1.5s linear infinite" }}><I.Gps s={20} c={C.lime} /></div> : <I.Pin s={20} c={isLocked ? C.grn : needsHelp ? C.red : C.lime} />}
        </div>
        {isLocked && <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: `2px solid ${C.grn}40`, animation: "ping 2s ease-out infinite" }} />}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: isLocked ? C.grn : needsHelp ? C.red : C.t2 }}>{isLocked ? t.gpsLocked : needsHelp ? t.gpsDenied : isAcquiring ? t.acquiringGps : t.gpsError}</p>
        <p style={{ fontSize: 12, color: C.t3, marginTop: 2 }}>{isLocked ? address || "..." : isAcquiring ? "..." : error}</p>
        {isLocked && coords && <p style={{ fontSize: 10, color: C.t3, marginTop: 3, fontFamily: "monospace" }}>{coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</p>}
      </div>
    </div>
    {needsHelp && <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
      <button onClick={() => setShowHelp(!showHelp)} style={{ ...btn, background: "none", color: C.t1, padding: "0 0 10px", fontSize: 13, width: "100%", justifyContent: "space-between", borderRadius: 0 }}><span>{t.howToEnable}</span><span style={{ transform: showHelp ? "rotate(90deg)" : "rotate(0)", transition: "transform .2s", display: "flex" }}><I.Right s={16} c={C.t2} /></span></button>
      {showHelp && <div style={{ animation: "fadeIn .2s", marginBottom: 14 }}>
        {isIOS && <div style={{ background: C.surface, borderRadius: 12, padding: 14, marginBottom: 8 }}><p style={{ fontSize: 12, fontWeight: 700, color: C.lime, marginBottom: 8 }}>iPhone</p><div style={{ fontSize: 12, color: C.t2, lineHeight: 1.6 }}><p>1. Settings</p><p>2. Privacy & Security &rarr; Location Services</p><p>3. Turn ON &rarr; Find browser &rarr; While Using</p></div></div>}
        {isAndroid && <div style={{ background: C.surface, borderRadius: 12, padding: 14, marginBottom: 8 }}><p style={{ fontSize: 12, fontWeight: 700, color: C.lime, marginBottom: 8 }}>Android</p><div style={{ fontSize: 12, color: C.t2, lineHeight: 1.6 }}><p>1. Settings &rarr; Location &rarr; ON</p><p>2. App permissions &rarr; Browser &rarr; Allow</p></div></div>}
        {!isIOS && !isAndroid && <div style={{ background: C.surface, borderRadius: 12, padding: 14 }}><p style={{ fontSize: 12, color: C.t2 }}>Click lock icon in address bar &rarr; Location &rarr; Allow &rarr; Refresh</p></div>}
      </div>}
      <button onClick={retry} style={{ ...btn, background: C.lime, color: "#111", width: "100%", fontSize: 14 }}><I.Gps s={16} c="#111" /> {t.tryAgain}</button>
    </div>}
  </div>;
}

// ═══ LOGIN ═══
function Login({ onLogin }) {
  const [mode, setMode] = useState("pick");
  const [lang, setLang] = useState("en");
  const [email, setEmail] = useState(""); const [pw, setPw] = useState("");
  const [pin, setPin] = useState(""); const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);
  const t = T[lang];

  const doMgr = async () => {
    setLoading(true);
    try {
      const res = await sb.get("managers", `email=eq.${encodeURIComponent(email.trim().toLowerCase())}&active=eq.true`);
      if (res.length && res[0].password_hash === pw) onLogin({ type: "manager", user: res[0], lang });
      else setErr(t.invalidLogin);
    } catch { setErr("Connection error"); }
    setLoading(false);
  };

  const doEmp = async () => {
    setLoading(true);
    try {
      const res = await sb.get("employees", `pin=eq.${pin}&active=eq.true`);
      if (res.length) onLogin({ type: "employee", user: res[0], lang });
      else { setErr(t.invalidPin); setPin(""); }
    } catch { setErr("Connection error"); setPin(""); }
    setLoading(false);
  };

  useEffect(() => { if (pin.length === 4) doEmp(); }, [pin]);

  return <div style={{ fontFamily: "'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif", background: C.bg, color: C.t1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" }}>
    <style>{css}</style>
    <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", background: `radial-gradient(circle,${C.lime}18,transparent 70%)`, animation: "pulse2 4s ease-in-out infinite" }} />

    {/* Language toggle */}
    <button onClick={() => setLang(l => l === "en" ? "es" : "en")} style={{ position: "absolute", top: 20, right: 20, ...btn, background: C.card, color: C.t2, border: `1px solid ${C.border}`, padding: "8px 14px", fontSize: 13, zIndex: 10 }}>
      <I.Globe s={16} /> {lang === "en" ? "ES" : "EN"}
    </button>

    <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 340, textAlign: "center", animation: "fadeUp .5s ease" }}>
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
        <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 16, padding: "12px 20px", border: `1px solid ${C.limeBdr}` }}><Logo h={52} /></div>
      </div>
      <p style={{ color: C.t2, fontSize: 13, fontWeight: 500, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 36 }}>{t.crewManager}</p>

      {mode === "pick" && <div style={{ display: "flex", flexDirection: "column", gap: 12, animation: "fadeIn .3s" }}>
        <button onClick={() => { setMode("mgr"); setErr(""); }} style={{ ...btn, background: C.lime, color: "#111", width: "100%", padding: "16px 24px", fontSize: 16 }}><I.Gear s={18} c="#111" /> {t.managerPortal}</button>
        <button onClick={() => { setMode("emp"); setErr(""); }} style={{ ...btn, background: C.card, color: C.t1, border: `1px solid ${C.border}`, width: "100%", padding: "16px 24px", fontSize: 16 }}><I.Clock s={18} /> {t.employeeClockIn}</button>
      </div>}

      {mode === "mgr" && <div style={{ animation: "fadeIn .3s", textAlign: "left" }}>
        <Inp label={t.email} value={email} onChange={setEmail} placeholder="ajarp1992@gmail.com" />
        <Inp label={t.password} value={pw} onChange={setPw} placeholder="Password" type="password" />
        {err && <p style={{ color: C.red, fontSize: 13, marginBottom: 12, textAlign: "center" }}>{err}</p>}
        <button onClick={doMgr} disabled={loading} style={{ ...btn, background: C.lime, color: "#111", width: "100%", marginBottom: 12, opacity: loading ? .5 : 1 }}>{loading ? "..." : t.signIn}</button>
        <button onClick={() => { setMode("pick"); setErr(""); setEmail(""); setPw(""); }} style={{ ...btn, background: "none", color: C.t2, width: "100%" }}>{t.back}</button>
      </div>}

      {mode === "emp" && <div style={{ animation: "fadeIn .3s" }}>
        <p style={{ color: C.t2, fontSize: 14, marginBottom: 20 }}>{t.enterPin}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 20 }}>
          {[0, 1, 2, 3].map(i => <div key={i} style={{ width: 52, height: 60, borderRadius: 14, background: pin[i] ? C.limeBg : C.card, border: `2px solid ${pin[i] ? C.lime : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: C.lime, transition: "all .2s" }}>{pin[i] ? "\u2022" : ""}</div>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, maxWidth: 240, margin: "0 auto 16px" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "del"].map((n, i) => <button key={i} onClick={() => { if (n === null) return; if (n === "del") { setPin(pin.slice(0, -1)); setErr(""); } else if (pin.length < 4) { setPin(p => p + n); setErr(""); } }} style={{ ...btn, background: n === null ? "transparent" : C.card, color: n === "del" ? C.t2 : C.t1, fontSize: n === "del" ? 13 : 20, fontWeight: 600, padding: "14px 0", border: n === null ? "none" : `1px solid ${C.border}`, cursor: n === null ? "default" : "pointer", borderRadius: 14 }}>{n === null ? "" : n === "del" ? "DEL" : n}</button>)}
        </div>
        {err && <p style={{ color: C.red, fontSize: 13, marginBottom: 12 }}>{err}</p>}
        <button onClick={() => { setMode("pick"); setPin(""); setErr(""); }} style={{ ...btn, background: "none", color: C.t2, width: "100%", marginTop: 4 }}>{t.back}</button>
      </div>}
    </div>
  </div>;
}

// ═══ EMPLOYEE VIEW ═══
function EmpView({ user, lang, onLogout }) {
  const t = useT();
  const gps = useGPS();
  const [projects, setProjects] = useState([]);
  const [entries, setEntries] = useState([]);
  const [proj, setProj] = useState("");
  const [now, setNow] = useState(new Date());
  const [note, setNote] = useState("");
  const [ppOffset, setPpOffset] = useState(0);

  const loadData = async () => {
    const [p, e] = await Promise.all([
      sb.get("projects", "status=eq.active&order=name"),
      sb.get("time_entries", `employee_id=eq.${user.id}&order=clock_in.desc&limit=50`)
    ]);
    setProjects(p); setEntries(e);
    if (p.length && !proj) setProj(p[0].id);
  };

  useEffect(() => { loadData(); const i = setInterval(() => setNow(new Date()), 1000); const r = setInterval(loadData, 30000); return () => { clearInterval(i); clearInterval(r); }; }, []);

  const active = entries.find(e => !e.clock_out);
  const today = now.toISOString().slice(0, 10);
  const todayEntries = entries.filter(e => e.clock_in?.startsWith(today));

  // Pay period
  const ppDate = new Date(); ppDate.setDate(ppDate.getDate() + ppOffset * 16);
  const pp = getPayPeriod(ppDate);
  const ppEntries = entries.filter(e => { const d = new Date(e.clock_in); return d >= pp.start && d <= pp.end; });
  const ppTotal = ppEntries.reduce((s, e) => s + parseFloat(hrs(e.clock_in, e.clock_out)), 0);

  const clockIn = async () => {
    await sb.post("time_entries", { employee_id: user.id, project_id: proj || null, clock_in: new Date().toISOString(), lat_in: gps.coords?.lat, lng_in: gps.coords?.lng, addr_in: gps.address || "Unknown" });
    loadData();
  };
  const clockOut = async () => {
    if (!active) return;
    await sb.patch("time_entries", active.id, { clock_out: new Date().toISOString(), lat_out: gps.coords?.lat, lng_out: gps.coords?.lng, addr_out: gps.address || "", daily_note: note || null });
    setNote(""); loadData();
  };

  const canClock = gps.status === "locked";

  return <div style={{ fontFamily: "'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif", background: C.bg, color: C.t1, minHeight: "100vh", maxWidth: 480, margin: "0 auto" }}>
    <style>{css}</style>
    <div style={{ padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: "rgba(17,17,17,.92)", backdropFilter: "blur(20px)", zIndex: 50 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}><Logo h={28} /><div><p style={{ fontSize: 12, color: C.t2 }}>{t.welcomeBack}</p><p style={{ fontSize: 15, fontWeight: 700 }}>{user.name}</p></div></div>
      <button onClick={onLogout} style={{ background: "none", border: "none", cursor: "pointer", color: C.t2 }}><I.Out s={20} /></button>
    </div>
    <div style={{ padding: "20px 20px 40px" }}>
      <div style={{ textAlign: "center", marginBottom: 28, animation: "fadeUp .5s" }}>
        <p style={{ fontSize: 48, fontWeight: 200, fontVariantNumeric: "tabular-nums" }}>{now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}</p>
        <p style={{ color: C.t2, fontSize: 14, marginTop: 4 }}>{fmtDateFull(now.toISOString())}</p>
      </div>

      <GPSCard gps={gps} />

      {!active && <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.t2, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>{t.assignProject}</div>
        <select value={proj} onChange={e => setProj(e.target.value)} style={{ ...inp(false), appearance: "none", cursor: "pointer" }}>
          <option value="">{t.selectProject}</option>
          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>}

      {active && <div style={{ marginBottom: 16 }}>
        <Inp label={t.dailyNote} value={note} onChange={setNote} placeholder={t.addNote} />
      </div>}

      <div style={{ textAlign: "center", margin: "32px 0" }}>
        {!active ? <button onClick={clockIn} disabled={!canClock} style={{ width: 170, height: 170, borderRadius: "50%", background: `linear-gradient(135deg,${C.lime},${C.limeDk})`, border: "none", cursor: canClock ? "pointer" : "default", fontSize: 17, fontWeight: 700, color: "#111", boxShadow: `0 0 40px ${C.lime}30`, opacity: canClock ? 1 : .4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto", fontFamily: "inherit" }}><I.Clock s={30} c="#111" /><span style={{ marginTop: 8 }}>{t.clockIn}</span></button>
        : <div>
          <p style={{ color: C.grn, fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{t.currentlyIn}</p>
          <p style={{ color: C.t2, fontSize: 13, marginBottom: 16 }}>{t.since} {fmtTime(active.clock_in)} - {hrs(active.clock_in, null)} {t.hrs}</p>
          <button onClick={clockOut} style={{ width: 170, height: 170, borderRadius: "50%", background: `linear-gradient(135deg,${C.red},#dc2626)`, border: "none", cursor: "pointer", fontSize: 17, fontWeight: 700, color: "#fff", boxShadow: `0 0 40px ${C.red}30`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto", fontFamily: "inherit" }}><I.Clock s={30} c="#fff" /><span style={{ marginTop: 8 }}>{t.clockOut}</span></button>
        </div>}
      </div>

      {/* Pay Period */}
      <div style={{ ...crd, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <button onClick={() => setPpOffset(o => o - 1)} style={{ background: "none", border: "none", cursor: "pointer", color: C.t2 }}><I.Left s={20} /></button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.t2, textTransform: "uppercase", letterSpacing: ".08em" }}>{t.payPeriod}</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>{pp.label}</div>
          </div>
          <button onClick={() => setPpOffset(o => Math.min(o + 1, 0))} style={{ background: "none", border: "none", cursor: "pointer", color: ppOffset < 0 ? C.t2 : C.t3 }}><I.Right s={20} /></button>
        </div>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <p style={{ fontSize: 36, fontWeight: 200, color: C.lime }}>{ppTotal.toFixed(1)}</p>
          <p style={{ fontSize: 10, color: C.t2, fontWeight: 700, textTransform: "uppercase" }}>{t.total} {t.hrs}</p>
        </div>
        {ppEntries.length === 0 ? <p style={{ color: C.t3, fontSize: 13, textAlign: "center" }}>{t.noHoursYet}</p> : ppEntries.map(e => {
          const p = projects.find(x => x.id === e.project_id);
          return <div key={e.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: `1px solid ${C.border}`, fontSize: 13 }}>
            <div><span style={{ color: C.t2 }}>{fmtDateShort(e.clock_in)}</span> <span style={{ color: C.t1 }}>{fmtTime(e.clock_in)} - {e.clock_out ? fmtTime(e.clock_out) : t.currentlyIn}</span></div>
            <span style={{ color: C.lime, fontWeight: 600 }}>{hrs(e.clock_in, e.clock_out)}</span>
          </div>;
        })}
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: C.t2, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>{t.todayLog}</div>
      {todayEntries.length === 0 ? <p style={{ color: C.t3, fontSize: 14 }}>{t.noEntries}</p> : todayEntries.map(e => {
        const p = projects.find(x => x.id === e.project_id);
        return <div key={e.id} style={{ ...crd, marginBottom: 8, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><p style={{ fontSize: 14, fontWeight: 600 }}>{p?.name || t.unassigned}</p><p style={{ fontSize: 12, color: C.t2, marginTop: 2 }}>{fmtTime(e.clock_in)} &rarr; {e.clock_out ? fmtTime(e.clock_out) : t.currentlyIn}</p>{e.daily_note && <p style={{ fontSize: 11, color: C.t3, marginTop: 3, fontStyle: "italic" }}>{e.daily_note}</p>}</div>
          <span style={badge(e.clock_out ? C.t2 : C.grn, e.clock_out ? C.surface : C.grnBg)}>{hrs(e.clock_in, e.clock_out)} {t.hrs}</span>
        </div>;
      })}
    </div>
  </div>;
}

// ═══ MANAGER DASHBOARD ═══
function Manager({ user, lang: initLang, onLogout }) {
  const [lang, setLang] = useState(initLang);
  const [tab, setTab] = useState("home");
  const [modal, setModal] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [entries, setEntries] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selProj, setSelProj] = useState(null);
  const [editEntry, setEditEntry] = useState(null);
  const [ppOffset, setPpOffset] = useState(0);
  const [ppEmpFilter, setPpEmpFilter] = useState("all");

  // Forms
  const [ef, setEf] = useState({ name: "", pin: "", role: "Tile Setter", phone: "" });
  const [mf, setMf] = useState({ email: "", password_hash: "", name: "", role: "manager" });
  const [pf, setPf] = useState({ name: "", address: "", notes: "", status: "active" });
  const [af, setAf] = useState({ title: "", body: "", urgent: false });
  const [msg, setMsg] = useState("");
  const [editIn, setEditIn] = useState(""); const [editOut, setEditOut] = useState(""); const [editReason, setEditReason] = useState("");

  const t = T[lang];

  const loadAll = async () => {
    const [emps, mgrs, projs, ents, anns, msgs] = await Promise.all([
      sb.get("employees", "active=eq.true&order=name"),
      sb.get("managers", "active=eq.true&order=name"),
      sb.get("projects", "order=created_at.desc"),
      sb.get("time_entries", "order=clock_in.desc&limit=200"),
      sb.get("announcements", "order=created_at.desc&limit=20"),
      sb.get("messages", "order=created_at.desc&limit=100"),
    ]);
    setEmployees(emps); setManagers(mgrs); setProjects(projs); setEntries(ents); setAnnouncements(anns); setMessages(msgs);
  };

  useEffect(() => { loadAll(); const r = setInterval(loadAll, 15000); return () => clearInterval(r); }, []);

  const today = new Date().toISOString().slice(0, 10);
  const todayE = entries.filter(e => e.clock_in?.startsWith(today));
  const live = todayE.filter(e => !e.clock_out);
  const totalH = todayE.reduce((s, e) => s + parseFloat(hrs(e.clock_in, e.clock_out)), 0);
  const actProj = projects.filter(p => p.status === "active");

  // Pay period
  const ppDate = new Date(); ppDate.setDate(ppDate.getDate() + ppOffset * 16);
  const pp = getPayPeriod(ppDate);
  const ppEntries = entries.filter(e => { const d = new Date(e.clock_in); return d >= pp.start && d <= pp.end && (ppEmpFilter === "all" || e.employee_id === ppEmpFilter); });
  const ppTotal = ppEntries.reduce((s, e) => s + parseFloat(hrs(e.clock_in, e.clock_out)), 0);

  const addEmp = async () => { await sb.post("employees", ef); setEf({ name: "", pin: "", role: "Tile Setter", phone: "" }); setModal(null); loadAll(); };
  const rmEmp = async (id) => { await sb.patch("employees", id, { active: false }); loadAll(); };
  const addMgr = async () => { await sb.post("managers", mf); setMf({ email: "", password_hash: "", name: "", role: "manager" }); setModal(null); loadAll(); };
  const addProj = async () => { await sb.post("projects", pf); setPf({ name: "", address: "", notes: "", status: "active" }); setModal(null); loadAll(); };
  const postAnn = async () => { await sb.post("announcements", { ...af, author_id: user.id }); setAf({ title: "", body: "", urgent: false }); setModal(null); loadAll(); };
  const sendMsg = async () => { if (!msg.trim() || !selProj) return; await sb.post("messages", { project_id: selProj.id, author_name: user.name, body: msg.trim() }); setMsg(""); loadAll(); };

  const saveEdit = async () => {
    if (!editEntry) return;
    const upd = { clock_in: editIn, clock_out: editOut || null, edited_by: user.id, edited_at: new Date().toISOString(), edit_reason: editReason };
    if (!editEntry.original_in) { upd.original_in = editEntry.clock_in; upd.original_out = editEntry.clock_out; }
    await sb.patch("time_entries", editEntry.id, upd);
    setEditEntry(null); setEditIn(""); setEditOut(""); setEditReason(""); loadAll();
  };

  const navItems = [
    { k: "home", icon: I.Home, label: t.home },
    { k: "time", icon: I.Clock, label: t.time },
    { k: "team", icon: I.Users, label: t.team },
    { k: "projects", icon: I.Folder, label: t.projects },
    { k: "announce", icon: I.Bell, label: t.announce },
  ];

  // ─── HOME TAB ───
  const renderHome = () => <div style={{ padding: "16px 20px 120px" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
      {[{ v: live.length, l: t.clockedIn, c: C.lime }, { v: totalH.toFixed(1), l: t.hoursToday, c: C.t1 }, { v: employees.length, l: t.crew, c: C.t1 }, { v: actProj.length, l: t.activeJobs, c: C.t1 }].map((s, i) => <div key={i} style={{ ...crd, textAlign: "center" }}><p style={{ fontSize: 30, fontWeight: 200, color: s.c }}>{s.v}</p><p style={{ fontSize: 10, color: C.t2, fontWeight: 700, textTransform: "uppercase", marginTop: 4 }}>{s.l}</p></div>)}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.t2, textTransform: "uppercase", letterSpacing: ".08em" }}>{t.liveCrewStatus}</div>
      <span style={{ ...badge(C.grn, C.grnBg), animation: "blink 2s infinite" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: C.grn, marginRight: 6, display: "inline-block" }} />LIVE</span>
    </div>
    {employees.map(emp => {
      const entry = live.find(e => e.employee_id === emp.id); const proj = entry ? projects.find(p => p.id === entry.project_id) : null;
      return <div key={emp.id} style={{ ...crd, marginBottom: 8, padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: entry ? C.grnBg : C.surface, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: entry ? C.grn : C.t3 }}>{emp.name.split(" ").map(n => n[0]).join("")}</div>
            <div><p style={{ fontSize: 14, fontWeight: 600 }}>{emp.name}</p><p style={{ fontSize: 12, color: C.t2 }}>{emp.role}</p></div>
          </div>
          <span style={badge(entry ? C.grn : C.t3, entry ? C.grnBg : C.surface)}>{entry ? t.onSite : t.off}</span>
        </div>
        {entry && <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: C.t2 }}><I.Pin s={11} c={C.grn} />{entry.addr_in}</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}><span style={{ fontSize: 12, color: C.t2 }}>{proj?.name}</span><span style={{ fontSize: 12, color: C.lime, fontWeight: 600 }}>{hrs(entry.clock_in, null)} {t.hrs}</span></div>
        </div>}
      </div>;
    })}
  </div>;

  // ─── TIME TAB ───
  const renderTime = () => <div style={{ padding: "16px 20px 120px" }}>
    {/* Pay Period Navigator */}
    <div style={{ ...crd, marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <button onClick={() => setPpOffset(o => o - 1)} style={{ background: "none", border: "none", cursor: "pointer", color: C.t2 }}><I.Left s={20} /></button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.t2, textTransform: "uppercase" }}>{t.payPeriod}</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>{pp.label}</div>
        </div>
        <button onClick={() => setPpOffset(o => Math.min(o + 1, 0))} style={{ background: "none", border: "none", cursor: "pointer", color: ppOffset < 0 ? C.t2 : C.t3 }}><I.Right s={20} /></button>
      </div>
      <select value={ppEmpFilter} onChange={e => setPpEmpFilter(e.target.value)} style={{ ...inp(false), appearance: "none", cursor: "pointer", marginBottom: 12 }}>
        <option value="all">All Employees</option>
        {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
      </select>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <p style={{ fontSize: 36, fontWeight: 200, color: C.lime }}>{ppTotal.toFixed(1)}</p>
        <p style={{ fontSize: 10, color: C.t2, fontWeight: 700, textTransform: "uppercase" }}>{t.total} {t.hrs}</p>
      </div>
    </div>

    {ppEntries.map(e => {
      const emp = employees.find(x => x.id === e.employee_id); const proj = projects.find(p => p.id === e.project_id);
      return <div key={e.id} style={{ ...crd, marginBottom: 8, padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600 }}>{emp?.name || "?"}</p>
            <p style={{ fontSize: 12, color: C.t2, marginTop: 2 }}>{proj?.name || t.unassigned}</p>
            {e.daily_note && <p style={{ fontSize: 11, color: C.t3, marginTop: 3, fontStyle: "italic" }}>{e.daily_note}</p>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={badge(e.clock_out ? C.t1 : C.grn, e.clock_out ? C.surface : C.grnBg)}>{hrs(e.clock_in, e.clock_out)} {t.hrs}</span>
            <button onClick={() => { setEditEntry(e); setEditIn(e.clock_in?.slice(0, 16) || ""); setEditOut(e.clock_out?.slice(0, 16) || ""); setEditReason(""); setModal("edit"); }} style={{ background: "none", border: "none", cursor: "pointer", color: C.t3 }}><I.Edit s={14} /></button>
          </div>
        </div>
        <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", fontSize: 12, color: C.t3 }}>
          <span>{fmtDateShort(e.clock_in)} {fmtTime(e.clock_in)} &rarr; {e.clock_out ? fmtTime(e.clock_out) : t.currentlyIn}</span>
          {e.edited_at && <span style={{ color: C.yel }}>edited</span>}
        </div>
      </div>;
    })}
  </div>;

  // ─── TEAM TAB ───
  const renderTeam = () => <div style={{ padding: "16px 20px 120px" }}>
    {/* Language Toggle */}
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <button onClick={() => setLang("en")} style={{ ...btn, flex: 1, background: lang === "en" ? C.limeBg : C.card, color: lang === "en" ? C.lime : C.t2, border: `1px solid ${lang === "en" ? C.lime : C.border}`, fontSize: 13 }}><I.Globe s={14} /> EN</button>
      <button onClick={() => setLang("es")} style={{ ...btn, flex: 1, background: lang === "es" ? C.limeBg : C.card, color: lang === "es" ? C.lime : C.t2, border: `1px solid ${lang === "es" ? C.lime : C.border}`, fontSize: 13 }}><I.Globe s={14} /> ES</button>
    </div>

    <button onClick={() => setModal("emp")} style={{ ...btn, background: C.lime, color: "#111", width: "100%", marginBottom: 12 }}><I.Plus s={18} c="#111" /> {t.addEmployee}</button>
    <button onClick={() => setModal("mgr")} style={{ ...btn, background: C.card, color: C.t1, border: `1px solid ${C.border}`, width: "100%", marginBottom: 16 }}><I.Plus s={18} /> {t.addManager}</button>

    <div style={{ fontSize: 11, fontWeight: 700, color: C.t2, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>{t.managers}</div>
    {managers.map(m => <div key={m.id} style={{ ...crd, marginBottom: 8, padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><p style={{ fontSize: 15, fontWeight: 600 }}>{m.name}</p><p style={{ fontSize: 12, color: C.t2 }}>{m.email} - {m.role === "owner" ? t.owner : t.manager}</p></div>
        {m.role === "owner" && <span style={badge(C.lime, C.limeBg)}>{t.owner}</span>}
      </div>
    </div>)}

    <div style={{ fontSize: 11, fontWeight: 700, color: C.t2, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8, marginTop: 16 }}>{t.crew}</div>
    {employees.map(emp => <div key={emp.id} style={{ ...crd, marginBottom: 8, padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: C.limeBg, border: `1px solid ${C.limeBdr}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: C.lime }}>{emp.name.split(" ").map(n => n[0]).join("")}</div>
          <div><p style={{ fontSize: 15, fontWeight: 600 }}>{emp.name}</p><p style={{ fontSize: 12, color: C.t2 }}>{emp.role}</p></div>
        </div>
        <button onClick={() => rmEmp(emp.id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.t3 }}><I.Trash s={16} /></button>
      </div>
      <div style={{ height: 1, background: C.border, margin: "12px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.t2 }}><span>PIN: {emp.pin}</span><span>{emp.phone}</span></div>
    </div>)}
  </div>;

  // ─── PROJECTS TAB ───
  const renderProjects = () => {
    if (selProj) {
      const pMsgs = messages.filter(m => m.project_id === selProj.id);
      const pH = entries.filter(e => e.project_id === selProj.id).reduce((s, e) => s + parseFloat(hrs(e.clock_in, e.clock_out)), 0);
      return <div style={{ padding: "16px 20px 120px" }}>
        <button onClick={() => setSelProj(null)} style={{ ...btn, background: "none", color: C.t2, padding: "8px 0", marginBottom: 16, fontSize: 13, justifyContent: "flex-start" }}><I.Left s={16} /> {t.allProjects}</button>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{selProj.name}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: C.t2, marginBottom: 16 }}><I.Pin s={13} />{selProj.address}</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {[{ v: pH.toFixed(1), l: t.hrs }, { v: pMsgs.length, l: t.messages }].map((s, i) => <div key={i} style={{ ...crd, flex: 1, textAlign: "center", padding: 14 }}><p style={{ fontSize: 22, fontWeight: 200, color: C.lime }}>{s.v}</p><p style={{ fontSize: 9, color: C.t2, fontWeight: 700, textTransform: "uppercase" }}>{s.l}</p></div>)}
        </div>
        {selProj.notes && <div style={{ ...crd, marginBottom: 16, fontSize: 13, color: C.t2 }}>{selProj.notes}</div>}

        <div style={{ fontSize: 11, fontWeight: 700, color: C.t2, textTransform: "uppercase", marginBottom: 10 }}>{t.messages}</div>
        {pMsgs.map(m => <div key={m.id} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
            <span style={{ fontWeight: 700, color: m.author_name === user.name ? C.lime : C.t1 }}>{m.author_name}</span>
            <span style={{ color: C.t3 }}>{fmtTime(m.created_at)}</span>
          </div>
          <p style={{ fontSize: 13, color: C.t2, marginTop: 2 }}>{m.body}</p>
        </div>)}
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <input value={msg} onChange={e => setMsg(e.target.value)} placeholder={t.sendUpdate} onKeyDown={e => e.key === "Enter" && sendMsg()} style={{ ...inp(false), flex: 1 }} />
          <button onClick={sendMsg} style={{ ...btn, background: C.lime, color: "#111", padding: "12px 16px" }}><I.Send s={16} c="#111" /></button>
        </div>
      </div>;
    }

    return <div style={{ padding: "16px 20px 120px" }}>
      <button onClick={() => setModal("proj")} style={{ ...btn, background: C.lime, color: "#111", width: "100%", marginBottom: 16 }}><I.Plus s={18} c="#111" /> {t.newProject}</button>
      {["active", "upcoming", "completed"].map(st => {
        const filtered = projects.filter(p => p.status === st);
        if (!filtered.length) return null;
        return <div key={st}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.t2, textTransform: "uppercase", marginBottom: 8, marginTop: 8 }}>{t[st]}</div>
          {filtered.map(proj => {
            const pH = entries.filter(e => e.project_id === proj.id).reduce((s, e) => s + parseFloat(hrs(e.clock_in, e.clock_out)), 0);
            return <div key={proj.id} onClick={() => setSelProj(proj)} style={{ ...crd, marginBottom: 8, padding: 14, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><p style={{ fontSize: 15, fontWeight: 600 }}>{proj.name}</p><p style={{ fontSize: 12, color: C.t2, display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}><I.Pin s={11} />{proj.address}</p></div>
                <I.Right s={18} c={C.t3} />
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: C.t3 }}><I.Clock s={11} /> {pH.toFixed(1)} {t.hrs}</div>
            </div>;
          })}
        </div>;
      })}
    </div>;
  };

  // ─── ANNOUNCEMENTS TAB ───
  const renderAnnounce = () => <div style={{ padding: "16px 20px 120px" }}>
    <button onClick={() => setModal("ann")} style={{ ...btn, background: C.lime, color: "#111", width: "100%", marginBottom: 16 }}><I.Plus s={18} c="#111" /> {t.postAnnouncement}</button>
    {announcements.length === 0 ? <p style={{ color: C.t3, fontSize: 14, textAlign: "center" }}>{t.noAnnouncements}</p> : announcements.map(a => {
      const author = managers.find(m => m.id === a.author_id);
      return <div key={a.id} style={{ ...crd, marginBottom: 8, borderLeft: a.urgent ? `3px solid ${C.red}` : `3px solid ${C.lime}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <p style={{ fontSize: 15, fontWeight: 700 }}>{a.title}</p>
          {a.urgent && <span style={badge(C.red, C.redBg)}>!</span>}
        </div>
        <p style={{ fontSize: 13, color: C.t2, lineHeight: 1.5 }}>{a.body}</p>
        <p style={{ fontSize: 11, color: C.t3, marginTop: 8 }}>{author?.name} - {fmtDateShort(a.created_at)} {fmtTime(a.created_at)}</p>
      </div>;
    })}
  </div>;

  return <LangCtx.Provider value={lang}>
    <div style={{ fontFamily: "'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif", background: C.bg, color: C.t1, minHeight: "100vh", maxWidth: 480, margin: "0 auto", position: "relative" }}>
      <style>{css}</style>
      <div style={{ padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "rgba(17,17,17,.92)", backdropFilter: "blur(20px)", zIndex: 50, borderBottom: `1px solid ${C.border}` }}>
        <Logo h={30} />
        <button onClick={onLogout} style={{ background: "none", border: "none", cursor: "pointer", color: C.t2, display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontFamily: "inherit" }}><I.Out s={16} /></button>
      </div>

      {tab === "home" && renderHome()}
      {tab === "time" && renderTime()}
      {tab === "team" && renderTeam()}
      {tab === "projects" && renderProjects()}
      {tab === "announce" && renderAnnounce()}

      {/* NAV */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "rgba(17,17,17,.95)", backdropFilter: "blur(20px)", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-around", padding: "8px 0 24px", zIndex: 100 }}>
        {navItems.map(n => <button key={n.k} onClick={() => { setTab(n.k); setSelProj(null); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", color: tab === n.k ? C.lime : C.t3, fontSize: 10, fontWeight: 600, padding: "4px 8px", background: "none", border: "none", fontFamily: "inherit" }}><n.icon s={20} c={tab === n.k ? C.lime : C.t3} /><span>{n.label}</span></button>)}
      </div>

      {/* MODALS */}
      <Modal open={modal === "emp"} onClose={() => setModal(null)} title={t.addEmployee}>
        <Inp label={t.fullName} value={ef.name} onChange={v => setEf({ ...ef, name: v })} placeholder="e.g. Carlos Mendez" />
        <Inp label={t.pin + " (4 digits)"} value={ef.pin} onChange={v => setEf({ ...ef, pin: v.slice(0, 4) })} placeholder="e.g. 3456" maxLength={4} />
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.t2, textTransform: "uppercase", marginBottom: 6 }}>{t.role}</div>
          <select value={ef.role} onChange={e => setEf({ ...ef, role: e.target.value })} style={{ ...inp(false), appearance: "none" }}>
            <option>Tile Setter</option><option>Apprentice</option><option>Flooring Installer</option><option>Foreman</option>
          </select>
        </div>
        <Inp label={t.phone} value={ef.phone} onChange={v => setEf({ ...ef, phone: v })} placeholder="(435) 555-0000" />
        <button onClick={addEmp} disabled={!ef.name || !ef.pin} style={{ ...btn, background: C.lime, color: "#111", width: "100%", opacity: ef.name && ef.pin ? 1 : .4 }}><I.Plus s={18} c="#111" /> {t.addEmployee}</button>
      </Modal>

      <Modal open={modal === "mgr"} onClose={() => setModal(null)} title={t.addManager}>
        <Inp label={t.fullName} value={mf.name} onChange={v => setMf({ ...mf, name: v })} placeholder="e.g. Sarah Johnson" />
        <Inp label={t.email} value={mf.email} onChange={v => setMf({ ...mf, email: v })} placeholder="email@example.com" />
        <Inp label={t.password} value={mf.password_hash} onChange={v => setMf({ ...mf, password_hash: v })} placeholder="Password" type="password" />
        <button onClick={addMgr} disabled={!mf.name || !mf.email || !mf.password_hash} style={{ ...btn, background: C.lime, color: "#111", width: "100%", opacity: mf.name && mf.email && mf.password_hash ? 1 : .4 }}><I.Plus s={18} c="#111" /> {t.addManager}</button>
      </Modal>

      <Modal open={modal === "proj"} onClose={() => setModal(null)} title={t.newProject}>
        <Inp label={t.projectName} value={pf.name} onChange={v => setPf({ ...pf, name: v })} placeholder="e.g. Smith Kitchen Backsplash" />
        <Inp label={t.address} value={pf.address} onChange={v => setPf({ ...pf, address: v })} placeholder="123 Main St, St. George, UT" />
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.t2, textTransform: "uppercase", marginBottom: 6 }}>{t.status}</div>
          <select value={pf.status} onChange={e => setPf({ ...pf, status: e.target.value })} style={{ ...inp(false), appearance: "none" }}>
            <option value="active">{t.active}</option><option value="upcoming">{t.upcoming}</option><option value="completed">{t.completed}</option>
          </select>
        </div>
        <Inp label={t.notes} value={pf.notes} onChange={v => setPf({ ...pf, notes: v })} placeholder="Tile type, special instructions..." />
        <button onClick={addProj} disabled={!pf.name} style={{ ...btn, background: C.lime, color: "#111", width: "100%", opacity: pf.name ? 1 : .4 }}><I.Plus s={18} c="#111" /> {t.newProject}</button>
      </Modal>

      <Modal open={modal === "ann"} onClose={() => setModal(null)} title={t.postAnnouncement}>
        <Inp label={t.title} value={af.title} onChange={v => setAf({ ...af, title: v })} placeholder="e.g. Safety meeting tomorrow" />
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.t2, textTransform: "uppercase", marginBottom: 6 }}>{t.body}</div>
          <textarea value={af.body} onChange={e => setAf({ ...af, body: e.target.value })} placeholder="Message for the crew..." rows={4} style={{ ...inp(false), resize: "vertical", fontFamily: "inherit" }} />
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, fontSize: 14, color: C.t1, cursor: "pointer" }}>
          <input type="checkbox" checked={af.urgent} onChange={e => setAf({ ...af, urgent: e.target.checked })} /> {t.urgent}
        </label>
        <button onClick={postAnn} disabled={!af.title || !af.body} style={{ ...btn, background: C.lime, color: "#111", width: "100%", opacity: af.title && af.body ? 1 : .4 }}><I.Bell s={18} c="#111" /> {t.postAnnouncement}</button>
      </Modal>

      <Modal open={modal === "edit"} onClose={() => { setModal(null); setEditEntry(null); }} title={t.editHours}>
        {editEntry && <>
          <p style={{ fontSize: 13, color: C.t2, marginBottom: 14 }}>{employees.find(e => e.id === editEntry.employee_id)?.name} - {fmtDateShort(editEntry.clock_in)}</p>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.t2, textTransform: "uppercase", marginBottom: 6 }}>{t.newClockIn}</div>
            <input type="datetime-local" value={editIn} onChange={e => setEditIn(e.target.value)} style={inp(false)} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.t2, textTransform: "uppercase", marginBottom: 6 }}>{t.newClockOut}</div>
            <input type="datetime-local" value={editOut} onChange={e => setEditOut(e.target.value)} style={inp(false)} />
          </div>
          <Inp label={t.reason} value={editReason} onChange={setEditReason} placeholder="e.g. Forgot to clock out" />
          <button onClick={saveEdit} disabled={!editIn || !editReason} style={{ ...btn, background: C.lime, color: "#111", width: "100%", opacity: editIn && editReason ? 1 : .4 }}>{t.save}</button>
        </>}
      </Modal>
    </div>
  </LangCtx.Provider>;
}

// ═══ MAIN APP ═══
export default function App() {
  const [auth, setAuth] = useState(null);

  if (!auth) return <Login onLogin={setAuth} />;
  if (auth.type === "employee") return <LangCtx.Provider value={auth.lang}><EmpView user={auth.user} lang={auth.lang} onLogout={() => setAuth(null)} /></LangCtx.Provider>;
  return <Manager user={auth.user} lang={auth.lang} onLogout={() => setAuth(null)} />;
}
