import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Lock, User, LogOut, Check, Trash2, Edit3, Plus, 
  Sparkles, Mail, Shield, Briefcase, FileText, Settings, Database,
  ArrowRight, RefreshCw, Eye
} from 'lucide-react';
import { Project, Article, ExperienceItem, Skill, ServiceItem, InquiryMessage } from '../types';

interface AdminProps {
  isDarkMode: boolean;
}

type AdminTab = 'services' | 'projects' | 'skills' | 'experience' | 'articles' | 'messages';

const url = "https://muneebcodes.tech/app/api"

export default function Admin({ isDarkMode }: AdminProps) {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('services');

  // Modal / Form state
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formFields, setFormFields] = useState<any>({});
  const [messageDetail, setMessageDetail] = useState<InquiryMessage | null>(null);

  // Confirmation state
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<{ id: string | number; title?: string } | null>(null);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  // Verification on mount
  useEffect(() => {
    if (token) {
      fetch(`${url}/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })
      .then(async res => {
        if (!res.ok) {
          handleLogout();
        } else {
          const data = await res.json();
          if (!data || data.valid === false) {
            handleLogout();
          }
        }
      })
      .catch(() => {
        handleLogout();
      });
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }
      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setFormFields({});
    } catch (err: any) {
      setLoginError(err.message || 'Authentication failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // ------------------- DATA FETCHING -------------------
  const { data: services = [], refetch: refetchServices } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await fetch(`${url}/services`);
      if (!res.ok) throw new Error('Failed to fetch services');
      const json = await res.json();
      return Array.isArray(json) ? json : [];
    },
    enabled: !!token
  });

  const { data: projects = [], refetch: refetchProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch(`{url/projects`);
      if (!res.ok) throw new Error('Failed to fetch projects');
      const json = await res.json();
      return Array.isArray(json) ? json : [];
    },
    enabled: !!token
  });

  const { data: skills = [], refetch: refetchSkills } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const res = await fetch(`${url}/skills`);
      if (!res.ok) throw new Error('Failed to fetch skills');
      const json = await res.json();
      return Array.isArray(json) ? json : [];
    },
    enabled: !!token
  });

  const { data: experiences = [], refetch: refetchExperiences } = useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const res = await fetch(`${url}/experiences`);
      if (!res.ok) throw new Error('Failed to fetch experiences');
      const json = await res.json();
      return Array.isArray(json) ? json : [];
    },
    enabled: !!token
  });

  const { data: articles = [], refetch: refetchArticles } = useQuery({
    queryKey: ['blog'],
    queryFn: async () => {
      const res = await fetch(`${url}/blog`);
      if (!res.ok) throw new Error('Failed to fetch articles');
      const json = await res.json();
      return Array.isArray(json) ? json : [];
    },
    enabled: !!token
  });

  const { data: messages = [], refetch: refetchMessages } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const res = await fetch(`${url}/contact/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch messages');
      const json = await res.json();
      return Array.isArray(json) ? json : [];
    },
    enabled: !!token
  });

  // ------------------- CRUD MUTATIONS -------------------
  const executeCrud = async (endpoint: string, method: 'POST' | 'PUT' | 'DELETE', body?: any, id?: string | number) => {
    const url = id !== undefined ? `${endpoint}/${id}` : endpoint;
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: body ? JSON.stringify(body) : undefined
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || 'Operation failed');
    }
    return res.json();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let endpoint = '';
      let refetchKey = '';
      let formattedFields = { ...formFields };

      if (activeTab === 'services') {
        endpoint = '/api/services';
        refetchKey = 'services';
        if (typeof formattedFields.features === 'string') {
          formattedFields.features = formattedFields.features.split(',').map((f: string) => f.trim());
        }
      } else if (activeTab === 'projects') {
        endpoint = '/api/projects';
        refetchKey = 'projects';
        if (typeof formattedFields.technologies === 'string') {
          formattedFields.technologies = formattedFields.technologies.split(',').map((t: string) => t.trim());
        }
        if (typeof formattedFields.results === 'string') {
          formattedFields.results = formattedFields.results.split(',').map((r: string) => r.trim());
        }
        formattedFields.featured = !!formattedFields.featured;
      } else if (activeTab === 'skills') {
        endpoint = '/api/skills';
        refetchKey = 'skills';
        formattedFields.level = Number(formattedFields.level);
      } else if (activeTab === 'experience') {
        endpoint = '/api/experiences';
        refetchKey = 'experiences';
        if (typeof formattedFields.description === 'string') {
          formattedFields.description = formattedFields.description.split('|').map((d: string) => d.trim());
        }
        if (typeof formattedFields.skills === 'string') {
          formattedFields.skills = formattedFields.skills.split(',').map((s: string) => s.trim());
        }
      } else if (activeTab === 'articles') {
        endpoint = '/api/blog';
        refetchKey = 'blog';
        formattedFields.featured = !!formattedFields.featured;
      }

      if (isAddingNew) {
        await executeCrud(endpoint, 'POST', formattedFields);
      } else if (editingItem) {
        const id = activeTab === 'skills' ? editingItem.id : (editingItem.id || editingItem.name);
        await executeCrud(endpoint, 'PUT', formattedFields, id);
      }

      queryClient.invalidateQueries({ queryKey: [refetchKey] });
      // Trigger instant refetch
      if (refetchKey === 'services') refetchServices();
      if (refetchKey === 'projects') refetchProjects();
      if (refetchKey === 'skills') refetchSkills();
      if (refetchKey === 'experiences') refetchExperiences();
      if (refetchKey === 'blog') refetchArticles();

      // Reset
      setIsAddingNew(false);
      setEditingItem(null);
      setFormFields({});
    } catch (err: any) {
      alert(`Error saving: ${err.message}`);
    }
  };

  const handleDelete = async (itemId: string | number) => {
    try {
      let endpoint = '';
      let refetchKey = '';
      if (activeTab === 'services') { endpoint = '/api/services'; refetchKey = 'services'; }
      else if (activeTab === 'projects') { endpoint = '/api/projects'; refetchKey = 'projects'; }
      else if (activeTab === 'skills') { endpoint = '/api/skills'; refetchKey = 'skills'; }
      else if (activeTab === 'experience') { endpoint = '/api/experiences'; refetchKey = 'experiences'; }
      else if (activeTab === 'articles') { endpoint = '/api/blog'; refetchKey = 'blog'; }
      else if (activeTab === 'messages') { endpoint = '/api/contact/messages'; refetchKey = 'messages'; }

      await executeCrud(endpoint, 'DELETE', undefined, itemId);
      queryClient.invalidateQueries({ queryKey: [refetchKey] });
      
      if (refetchKey === 'services') refetchServices();
      if (refetchKey === 'projects') refetchProjects();
      if (refetchKey === 'skills') refetchSkills();
      if (refetchKey === 'experiences') refetchExperiences();
      if (refetchKey === 'blog') refetchArticles();
      if (refetchKey === 'messages') refetchMessages();

      if (messageDetail && messageDetail.id === itemId) {
        setMessageDetail(null);
      }
      setDeleteConfirmItem(null);
    } catch (err: any) {
      alert(`Error deleting: ${err.message}`);
    }
  };

  const handleEditClick = (item: any) => {
    setEditingItem(item);
    setIsAddingNew(false);
    
    // Format complex arrays into convenient fields
    const fields = { ...item };
    if (activeTab === 'services') {
      fields.features = Array.isArray(item.features) ? item.features.join(', ') : item.features;
    } else if (activeTab === 'projects') {
      fields.technologies = Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies;
      fields.results = Array.isArray(item.results) ? item.results.join(', ') : item.results;
    } else if (activeTab === 'experience') {
      fields.description = Array.isArray(item.description) ? item.description.join(' | ') : item.description;
      fields.skills = Array.isArray(item.skills) ? item.skills.join(', ') : item.skills;
    }
    setFormFields(fields);
  };

  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setEditingItem(null);
    
    // Set baseline template values
    if (activeTab === 'services') {
      setFormFields({ id: '', title: '', description: '', price: '$', features: '', details: '' });
    } else if (activeTab === 'projects') {
      setFormFields({ id: '', title: '', subtitle: '', challenge: '', solution: '', results: '', category: '3D Websites', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b', featured: false, technologies: '', year: '2026', client: '' });
    } else if (activeTab === 'skills') {
      setFormFields({ name: '', level: 85, category: 'frontend' });
    } else if (activeTab === 'experience') {
      setFormFields({ id: '', role: '', company: '', period: '', description: '', skills: '' });
    } else if (activeTab === 'articles') {
      setFormFields({ id: '', title: '', category: 'UI Design', readTime: '5 min read', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3', summary: '', content: '', featured: false, author: 'Muneeb Shahid', authorRole: 'Senior Full-Stack Developer' });
    }
  };

  // ------------------- SIGN IN FORM UI -------------------
  if (!token) {
    return (
      <div className="pt-36 pb-24 px-6 relative z-10 flex items-center justify-center min-h-[85vh]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 md:p-10 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-black/40 backdrop-blur-xl shadow-2xl space-y-8"
        >
          <div className="space-y-3 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-[#00f2fe]/10 flex items-center justify-center border border-[#00f2fe]/20">
              <Lock className="w-5 h-5 text-[#00f2fe]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-neutral-900 dark:text-white">
              ADMIN CONTROL PANEL
            </h2>
            <p className="text-xs text-neutral-550 dark:text-[#71717a] font-mono uppercase tracking-widest">
              Stateless cryptographic login gate
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-600 dark:text-zinc-400 tracking-wider uppercase block">
                ADMIN IDENTIFIER
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter administrator username"
                  className="w-full pl-11 pr-4 py-3 bg-white/40 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl text-xs md:text-sm font-sans focus:outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-600 dark:text-zinc-400 tracking-wider uppercase block">
                SECURITY SECRET
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator secret key"
                  className="w-full pl-11 pr-4 py-3 bg-white/40 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl text-xs md:text-sm font-sans focus:outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe] transition-all"
                />
              </div>
            </div>

            {loginError && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-xs font-mono text-red-500 bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl text-center"
              >
                🚨 {loginError}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#00f2fe] to-[#4facfe] hover:opacity-90 text-black font-mono font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg shadow-[#00f2fe]/20 cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? (
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
              ) : (
                <>
                  DECRYPT & AUTHENTICATE
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ------------------- MAIN DASHBOARD PANEL UI -------------------
  return (
    <div className="pt-32 pb-24 px-6 relative z-10 max-w-7xl mx-auto text-left">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-200 dark:border-white/10 mb-10">
        <div>
          <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">
            ● BACKEND MANAGER / CONTROL PANEL
          </span>
          <h1 className="text-3xl md:text-5xl font-sans font-black tracking-tighter text-neutral-900 dark:text-white flex items-center gap-2">
            ADMIN SYSTEM
            <Shield className="w-6 h-6 text-[#00f2fe]" />
          </h1>
        </div>
        
        <button
          onClick={() => setLogoutConfirmOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase border border-red-500/20 text-red-500 hover:bg-red-500/10 bg-red-500/5 transition-all cursor-pointer w-fit"
        >
          <LogOut className="w-3.5 h-3.5" />
          TERMINATE SESSION
        </button>
      </div>

      {/* Tabs list */}
      <div className="flex flex-wrap gap-2.5 mb-10 border-b border-neutral-200 dark:border-white/5 pb-6">
        {(['services', 'projects', 'skills', 'experience', 'articles', 'messages'] as AdminTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setIsAddingNew(false);
              setEditingItem(null);
              setMessageDetail(null);
              setFormFields({});
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase cursor-pointer border transition-all duration-300 flex items-center gap-2 ${
              activeTab === tab
                ? 'bg-[#00f2fe] text-black border-[#00f2fe] font-bold shadow-md shadow-[#00f2fe]/20'
                : 'bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-zinc-400 hover:border-neutral-400 dark:hover:border-white/30'
            }`}
          >
            {tab === 'services' && <Database className="w-3.5 h-3.5" />}
            {tab === 'projects' && <Sparkles className="w-3.5 h-3.5" />}
            {tab === 'skills' && <Settings className="w-3.5 h-3.5" />}
            {tab === 'experience' && <Briefcase className="w-3.5 h-3.5" />}
            {tab === 'articles' && <FileText className="w-3.5 h-3.5" />}
            {tab === 'messages' && <Mail className="w-3.5 h-3.5" />}
            {tab}
          </button>
        ))}
      </div>

      {/* MAIN CONTAINER: Split screen into Sidebar Grid or spacious Full-width list */}
      <div className={activeTab === 'messages' ? "grid grid-cols-1 lg:grid-cols-12 gap-10 items-start" : "w-full"}>
        {/* COLUMN: Data list index */}
        <div className={activeTab === 'messages' ? "lg:col-span-5 space-y-6" : "w-full space-y-6"}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-xs font-mono text-neutral-550 dark:text-[#71717a] uppercase tracking-widest block">
              {activeTab === 'messages' ? 'MESSAGE TRANSMISSIONS' : `${activeTab.toUpperCase()} RECORDS`}
            </h3>
            {activeTab !== 'messages' && (
              <button
                onClick={handleAddNewClick}
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#00f2fe] hover:bg-[#00f2fe]/90 text-black font-mono text-xs font-bold tracking-widest uppercase transition-all hover:shadow-lg hover:shadow-[#00f2fe]/20 cursor-pointer w-fit"
              >
                <Plus className="w-4 h-4" />
                CREATE RECORD
              </button>
            )}
          </div>

          <div className={activeTab === 'messages' 
            ? "space-y-3 max-h-[550px] overflow-y-auto pr-2 border-r border-neutral-200 dark:border-white/5" 
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          }>
            {activeTab === 'services' && Array.isArray(services) && services.map((svc: ServiceItem) => (
              <div key={svc.id} className="p-5 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-black/30 backdrop-blur-md flex flex-col justify-between gap-4 hover:border-[#00f2fe]/30 transition-all">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-base font-sans font-black text-neutral-900 dark:text-white line-clamp-1">{svc.title}</h4>
                    <span className="text-xs font-mono font-bold text-[#00f2fe] whitespace-nowrap bg-[#00f2fe]/10 px-2.5 py-1 rounded-full">{svc.price}</span>
                  </div>
                  <p className="text-xs text-neutral-550 dark:text-zinc-450 line-clamp-2">{svc.description}</p>
                  
                  {svc.features && svc.features.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-[#00f2fe] uppercase tracking-wider block">FEATURES INCLUDE:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {svc.features.map((feature, i) => (
                          <span key={i} className="text-[10px] font-sans bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/5 px-2 py-0.5 rounded-md text-neutral-600 dark:text-zinc-300">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-neutral-400 dark:text-zinc-500">
                    <span>TIMELINE:</span>
                    <span className="font-bold text-neutral-700 dark:text-zinc-300">{svc.details}</span>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100 dark:border-white/5">
                  <button onClick={() => handleEditClick(svc)} className="p-2 rounded-lg bg-neutral-100 dark:bg-white/5 hover:border-[#00f2fe]/20 hover:text-[#00f2fe] border border-transparent transition-all cursor-pointer text-xs flex items-center gap-1.5 px-3"><Edit3 className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => setDeleteConfirmItem({ id: svc.id, title: svc.title })} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 transition-all cursor-pointer text-xs flex items-center gap-1.5 px-3"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                </div>
              </div>
            ))}

            {activeTab === 'projects' && Array.isArray(projects) && projects.map((prj: Project) => (
              <div key={prj.id} className="p-5 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-black/30 backdrop-blur-md flex flex-col justify-between gap-4 hover:border-[#00f2fe]/30 transition-all">
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img src={prj.image} alt={prj.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-base font-sans font-black text-neutral-900 dark:text-white truncate">{prj.title}</h4>
                    <span className="text-[10px] font-mono text-neutral-400 dark:text-zinc-500 uppercase tracking-wider block mt-1">{prj.category} • {prj.year}</span>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100 dark:border-white/5">
                  <button onClick={() => handleEditClick(prj)} className="p-2 rounded-lg bg-neutral-100 dark:bg-white/5 hover:border-[#00f2fe]/20 hover:text-[#00f2fe] border border-transparent transition-all cursor-pointer text-xs flex items-center gap-1.5 px-3"><Edit3 className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => setDeleteConfirmItem({ id: prj.id, title: prj.title })} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 transition-all cursor-pointer text-xs flex items-center gap-1.5 px-3"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                </div>
              </div>
            ))}

            {activeTab === 'skills' && Array.isArray(skills) && skills.map((sk: Skill) => (
              <div key={sk.id || sk.name} className="p-5 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-black/30 backdrop-blur-md flex flex-col justify-between gap-4 hover:border-[#00f2fe]/30 transition-all">
                <div className="space-y-3">
                  <span className="text-[9px] font-mono text-[#00f2fe] bg-[#00f2fe]/10 px-2 py-0.5 rounded-full uppercase tracking-widest">{sk.category}</span>
                  <h4 className="text-base font-sans font-black text-neutral-900 dark:text-white mt-1">{sk.name}</h4>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#00f2fe] to-[#4facfe] h-full rounded-full" style={{ width: `${sk.level}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-450 dark:text-zinc-500 mt-1 block">Proficiency: {sk.level}%</span>
                </div>
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100 dark:border-white/5">
                  <button onClick={() => handleEditClick(sk)} className="p-2 rounded-lg bg-neutral-100 dark:bg-white/5 hover:border-[#00f2fe]/20 hover:text-[#00f2fe] border border-transparent transition-all cursor-pointer text-xs flex items-center gap-1.5 px-3"><Edit3 className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => setDeleteConfirmItem({ id: sk.id || sk.name, title: sk.name })} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 transition-all cursor-pointer text-xs flex items-center gap-1.5 px-3"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                </div>
              </div>
            ))}

            {activeTab === 'experience' && Array.isArray(experiences) && experiences.map((exp: ExperienceItem) => (
              <div key={exp.id} className="p-5 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-black/30 backdrop-blur-md flex flex-col justify-between gap-4 hover:border-[#00f2fe]/30 transition-all">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-neutral-450 dark:text-[#71717a]">{exp.period}</span>
                  <h4 className="text-base font-sans font-black text-neutral-900 dark:text-white mt-1">{exp.role}</h4>
                  <span className="text-xs font-mono text-[#00f2fe] block mt-0.5">{exp.company}</span>
                </div>
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100 dark:border-white/5">
                  <button onClick={() => handleEditClick(exp)} className="p-2 rounded-lg bg-neutral-100 dark:bg-white/5 hover:border-[#00f2fe]/20 hover:text-[#00f2fe] border border-transparent transition-all cursor-pointer text-xs flex items-center gap-1.5 px-3"><Edit3 className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => setDeleteConfirmItem({ id: exp.id, title: `${exp.role} at ${exp.company}` })} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 transition-all cursor-pointer text-xs flex items-center gap-1.5 px-3"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                </div>
              </div>
            ))}

            {activeTab === 'articles' && Array.isArray(articles) && articles.map((art: Article) => (
              <div key={art.id} className="p-5 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-black/30 backdrop-blur-md flex flex-col justify-between gap-4 hover:border-[#00f2fe]/30 transition-all">
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img src={art.image} alt={art.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-base font-sans font-black text-neutral-900 dark:text-white truncate">{art.title}</h4>
                    <span className="text-[10px] font-mono text-neutral-450 dark:text-zinc-500 block mt-1">{art.date} • {art.category}</span>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100 dark:border-white/5">
                  <button onClick={() => handleEditClick(art)} className="p-2 rounded-lg bg-neutral-100 dark:bg-white/5 hover:border-[#00f2fe]/20 hover:text-[#00f2fe] border border-transparent transition-all cursor-pointer text-xs flex items-center gap-1.5 px-3"><Edit3 className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => setDeleteConfirmItem({ id: art.id, title: art.title })} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 transition-all cursor-pointer text-xs flex items-center gap-1.5 px-3"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                </div>
              </div>
            ))}

            {activeTab === 'messages' && Array.isArray(messages) && messages.map((msg: InquiryMessage) => (
              <div key={msg.id} className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${messageDetail?.id === msg.id ? 'border-[#00f2fe]/40 bg-[#00f2fe]/5' : 'border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5'}`}>
                <div className="truncate">
                  <h4 className="text-sm font-sans font-bold text-neutral-900 dark:text-white truncate">{msg.name}</h4>
                  <span className="text-[10px] font-mono text-[#00f2fe] block truncate">{msg.subject}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => setMessageDetail(msg)} className="p-2 rounded-lg bg-neutral-200/50 dark:bg-white/5 hover:border-[#00f2fe]/20 hover:text-[#00f2fe] border border-transparent transition-all cursor-pointer"><Eye className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteConfirmItem({ id: msg.id, title: `Message from ${msg.name}` })} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 transition-all cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}

            {(((!Array.isArray(services) || !services.length) && activeTab === 'services') ||
              ((!Array.isArray(projects) || !projects.length) && activeTab === 'projects') ||
              ((!Array.isArray(skills) || !skills.length) && activeTab === 'skills') ||
              ((!Array.isArray(experiences) || !experiences.length) && activeTab === 'experience') ||
              ((!Array.isArray(articles) || !articles.length) && activeTab === 'articles') ||
              ((!Array.isArray(messages) || !messages.length) && activeTab === 'messages')) && (
              <div className="col-span-full text-center py-16 border border-dashed border-neutral-200 dark:border-white/5 rounded-3xl text-xs font-mono text-neutral-550 dark:text-[#71717a] h-[300px] flex flex-col items-center justify-center space-y-3">
                <Database className="w-8 h-8 text-neutral-450 dark:text-zinc-600" />
                <p>No records found in this database collection.</p>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Split Column Detail Panel: ONLY active for message transmissions */}
        {activeTab === 'messages' && (
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {messageDetail ? (
                <motion.div
                  key={`msg-${messageDetail.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-6 md:p-8 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md space-y-6"
                >
                  <div className="flex justify-between items-start gap-4 pb-4 border-b border-neutral-200 dark:border-white/10">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Inquiry Details</span>
                      <h3 className="text-lg md:text-xl font-sans font-black text-neutral-900 dark:text-white">{messageDetail.name}</h3>
                      <p className="text-xs font-mono text-[#00f2fe]"><a href={`mailto:${messageDetail.email}`}>{messageDetail.email}</a></p>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-450 dark:text-[#71717a] border border-neutral-200 dark:border-white/10 px-2.5 py-1 rounded-full">{new Date(messageDetail.created_at).toLocaleString()}</span>
                  </div>

                  <div className="space-y-4 text-xs md:text-sm">
                    <div>
                      <label className="text-[10px] font-mono text-neutral-550 dark:text-zinc-500 uppercase block mb-1">Subject</label>
                      <p className="font-semibold text-neutral-800 dark:text-zinc-200">{messageDetail.subject}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-neutral-550 dark:text-zinc-500 uppercase block mb-1">Budget Allocation</label>
                      <p className="font-semibold text-[#00f2fe] font-mono">{messageDetail.budget}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-neutral-550 dark:text-zinc-500 uppercase block mb-1">Project briefing / Specifications</label>
                      <div className="bg-neutral-100 dark:bg-black/30 p-4 rounded-xl text-neutral-600 dark:text-zinc-300 leading-relaxed font-sans whitespace-pre-wrap">
                        {messageDetail.details}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setDeleteConfirmItem({ id: messageDetail.id, title: `Inquiry from ${messageDetail.name}` })}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 font-mono text-xs tracking-widest uppercase transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      DELETE INQUIRY
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="p-8 rounded-3xl border border-dashed border-neutral-200 dark:border-white/10 bg-white/10 dark:bg-white/[0.02] text-center text-xs font-mono text-neutral-550 dark:text-zinc-500 h-[300px] flex flex-col items-center justify-center space-y-3">
                  <Mail className="w-8 h-8 text-neutral-400 animate-pulse" />
                  <p>Select a message transmission from the index log to review specifications.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* GLOBAL RECORD CREATION & MODIFICATION MODAL */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {(isAddingNew || editingItem) && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => { setIsAddingNew(false); setEditingItem(null); setFormFields({}); }}
                className="absolute inset-0 bg-neutral-950/75 backdrop-blur-sm"
              />

              {/* Modal box */}
              <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0c0c0d] border border-neutral-200 dark:border-white/10 rounded-3xl shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[85vh] z-10 text-left"
            >
              <div className="pb-4 border-b border-neutral-200 dark:border-white/10 mb-6 flex justify-between items-center">
                <h3 className="text-base font-sans font-black text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] animate-pulse"></span>
                  {isAddingNew ? `CREATE NEW ${activeTab.toUpperCase().slice(0, -1)}` : `EDIT ${activeTab.toUpperCase().slice(0, -1)} RECORD`}
                </h3>
                <button
                  onClick={() => { setIsAddingNew(false); setEditingItem(null); setFormFields({}); }}
                  className="text-xs font-mono text-neutral-450 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 transition-all border border-neutral-200 dark:border-white/5"
                >
                  ESC / CLOSE
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs md:text-sm">
                {/* FOR SERVICES */}
                {activeTab === 'services' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">UNIQUE ID (Slug)</label>
                        <input type="text" disabled={!isAddingNew} required value={formFields.id || ''} onChange={(e) => setFormFields({...formFields, id: e.target.value})} placeholder="e.g. creative-figma-design" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">TITLE</label>
                        <input type="text" required value={formFields.title || ''} onChange={(e) => setFormFields({...formFields, title: e.target.value})} placeholder="e.g. Luxury UX/UI Design" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">PRICE RATE</label>
                        <input type="text" required value={formFields.price || ''} onChange={(e) => setFormFields({...formFields, price: e.target.value})} placeholder="e.g. $4,500" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">FEATURES (Comma-separated)</label>
                        <input type="text" required value={formFields.features || ''} onChange={(e) => setFormFields({...formFields, features: e.target.value})} placeholder="Feature 1, Feature 2, Feature 3" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">DESCRIPTION</label>
                      <textarea required rows={2} value={formFields.description || ''} onChange={(e) => setFormFields({...formFields, description: e.target.value})} placeholder="Brief service tagline" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] resize-none text-neutral-900 dark:text-zinc-100" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">TIMELINE DETAILS</label>
                      <input type="text" required value={formFields.details || ''} onChange={(e) => setFormFields({...formFields, details: e.target.value})} placeholder="e.g. 2-3 WEEKS DISPATCH" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                    </div>
                  </>
                )}

                {/* FOR PROJECTS */}
                {activeTab === 'projects' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">PROJECT ID (Slug)</label>
                        <input type="text" disabled={!isAddingNew} required value={formFields.id || ''} onChange={(e) => setFormFields({...formFields, id: e.target.value})} placeholder="e.g. cosmic-finance-webgl" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">TITLE</label>
                        <input type="text" required value={formFields.title || ''} onChange={(e) => setFormFields({...formFields, title: e.target.value})} placeholder="e.g. COSMIC FINANCE" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">SUBTITLE</label>
                        <input type="text" required value={formFields.subtitle || ''} onChange={(e) => setFormFields({...formFields, subtitle: e.target.value})} placeholder="e.g. IMMERSIVE SHADER EXPERIENCE" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">CATEGORY</label>
                        <select value={formFields.category || '3D Websites'} onChange={(e) => setFormFields({...formFields, category: e.target.value})} className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100 dark:bg-zinc-900">
                          <option value="3D Websites">3D Websites</option>
                          <option value="Mobile UX/UI">Mobile UX/UI</option>
                          <option value="Branding & Web">Branding & Web</option>
                          <option value="Website Optimization">Website Optimization</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">TECHNOLOGIES (Comma-separated)</label>
                        <input type="text" required value={formFields.technologies || ''} onChange={(e) => setFormFields({...formFields, technologies: e.target.value})} placeholder="React, Three.js, WebGL, Tailwind" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">IMAGE LINK (URL)</label>
                        <input type="text" required value={formFields.image || ''} onChange={(e) => setFormFields({...formFields, image: e.target.value})} placeholder="https://..." className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">YEAR</label>
                        <input type="text" required value={formFields.year || ''} onChange={(e) => setFormFields({...formFields, year: e.target.value})} placeholder="2026" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">CLIENT</label>
                        <input type="text" required value={formFields.client || ''} onChange={(e) => setFormFields({...formFields, client: e.target.value})} placeholder="e.g. Cosmic Labs" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                      <div className="space-y-1.5 flex items-center justify-start gap-2 pt-6">
                        <input type="checkbox" id="field-featured" checked={!!formFields.featured} onChange={(e) => setFormFields({...formFields, featured: e.target.checked})} className="w-4 h-4 text-[#00f2fe] bg-neutral-100 border-neutral-300 rounded focus:ring-[#00f2fe]" />
                        <label htmlFor="field-featured" className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider text-[10px] cursor-pointer">FEATURED PROJECT</label>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">CHALLENGE DESCRIPTION</label>
                      <textarea required rows={2} value={formFields.challenge || ''} onChange={(e) => setFormFields({...formFields, challenge: e.target.value})} className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] resize-none text-neutral-900 dark:text-zinc-100" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">SOLUTION DESCRIPTION</label>
                      <textarea required rows={2} value={formFields.solution || ''} onChange={(e) => setFormFields({...formFields, solution: e.target.value})} className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] resize-none text-neutral-900 dark:text-zinc-100" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">RESULTS / METRICS (Comma-separated)</label>
                      <input type="text" required value={formFields.results || ''} onChange={(e) => setFormFields({...formFields, results: e.target.value})} placeholder="Result metric 1, Result metric 2" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                    </div>
                  </>
                )}

                {/* FOR SKILLS */}
                {activeTab === 'skills' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5 md:col-span-1">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">SKILL NAME</label>
                        <input type="text" required value={formFields.name || ''} onChange={(e) => setFormFields({...formFields, name: e.target.value})} placeholder="e.g. NestJS" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                      <div className="space-y-1.5 md:col-span-1">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">PROFICIENCY INDEX (0-100)</label>
                        <input type="number" min="0" max="100" required value={formFields.level || 85} onChange={(e) => setFormFields({...formFields, level: Number(e.target.value)})} className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                      <div className="space-y-1.5 md:col-span-1">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">CATEGORY</label>
                        <select value={formFields.category || 'frontend'} onChange={(e) => setFormFields({...formFields, category: e.target.value})} className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100 dark:bg-zinc-900">
                          <option value="frontend">Frontend Development</option>
                          <option value="backend">Backend & Database Architecture</option>
                          <option value="libraries">Libraries & Animation</option>
                          <option value="tools">Professional Tools & DevOps</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* FOR EXPERIENCE */}
                {activeTab === 'experience' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">UNIQUE ID (Slug)</label>
                        <input type="text" disabled={!isAddingNew} required value={formFields.id || ''} onChange={(e) => setFormFields({...formFields, id: e.target.value})} placeholder="e.g. senior-fullstack-dev" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">ROLE / TITLE</label>
                        <input type="text" required value={formFields.role || ''} onChange={(e) => setFormFields({...formFields, role: e.target.value})} placeholder="e.g. Senior Architect" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">COMPANY</label>
                        <input type="text" required value={formFields.company || ''} onChange={(e) => setFormFields({...formFields, company: e.target.value})} placeholder="e.g. Symmetric Tech" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">PERIOD / DATES</label>
                        <input type="text" required value={formFields.period || ''} onChange={(e) => setFormFields({...formFields, period: e.target.value})} placeholder="e.g. JAN 2025 - PRESENT" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">DESCRIPTION BULLETS (Separate using "|" pipe)</label>
                      <textarea required rows={3} value={formFields.description || ''} onChange={(e) => setFormFields({...formFields, description: e.target.value})} placeholder="Managed a team of devs | Re-designed core DB system | Optimized speed by 40%" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] resize-none text-neutral-900 dark:text-zinc-100" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">SKILLS USED (Comma-separated)</label>
                      <input type="text" required value={formFields.skills || ''} onChange={(e) => setFormFields({...formFields, skills: e.target.value})} placeholder="NestJS, SQL, Redis" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                    </div>
                  </>
                )}

                {/* FOR BLOG ARTICLES */}
                {activeTab === 'articles' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">ARTICLE ID (Slug)</label>
                        <input type="text" disabled={!isAddingNew} required value={formFields.id || ''} onChange={(e) => setFormFields({...formFields, id: e.target.value})} placeholder="e.g. guide-to-webgl-performance" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">TITLE</label>
                        <input type="text" required value={formFields.title || ''} onChange={(e) => setFormFields({...formFields, title: e.target.value})} placeholder="e.g. Masterclass on WebGL Performance" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">CATEGORY</label>
                        <select value={formFields.category || 'UI Design'} onChange={(e) => setFormFields({...formFields, category: e.target.value})} className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100 dark:bg-zinc-900">
                          <option value="UI Design">UI Design</option>
                          <option value="3D Websites">3D Websites</option>
                          <option value="Web Animation">Web Animation</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">READ TIME</label>
                        <input type="text" required value={formFields.readTime || ''} onChange={(e) => setFormFields({...formFields, readTime: e.target.value})} placeholder="5 min read" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">IMAGE LINK (URL)</label>
                        <input type="text" required value={formFields.image || ''} onChange={(e) => setFormFields({...formFields, image: e.target.value})} className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">DATE</label>
                        <input type="text" required value={formFields.date || ''} onChange={(e) => setFormFields({...formFields, date: e.target.value})} placeholder="March 12, 2026" className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">AUTHOR NAME</label>
                        <input type="text" required value={formFields.author || 'Muneeb Shahid'} onChange={(e) => setFormFields({...formFields, author: e.target.value})} className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                      </div>
                      <div className="space-y-1.5 flex items-center justify-start gap-2 pt-6">
                        <input type="checkbox" id="field-artfeatured" checked={!!formFields.featured} onChange={(e) => setFormFields({...formFields, featured: e.target.checked})} className="w-4 h-4 text-[#00f2fe] bg-neutral-100 border-neutral-300 rounded focus:ring-[#00f2fe]" />
                        <label htmlFor="field-artfeatured" className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider text-[10px] cursor-pointer">FEATURED ARTICLE</label>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">SUMMARY</label>
                      <textarea required rows={2} value={formFields.summary || ''} onChange={(e) => setFormFields({...formFields, summary: e.target.value})} className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00f2fe] resize-none text-neutral-900 dark:text-zinc-100" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-neutral-600 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">CONTENT (Markdown compatible)</label>
                      <textarea required rows={5} value={formFields.content || ''} onChange={(e) => setFormFields({...formFields, content: e.target.value})} className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl font-mono text-xs focus:outline-none focus:border-[#00f2fe] text-neutral-900 dark:text-zinc-100" />
                    </div>
                  </>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => { setIsAddingNew(false); setEditingItem(null); setFormFields({}); }}
                    className="px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white font-mono text-xs tracking-widest uppercase transition-all cursor-pointer font-bold"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black font-mono font-bold text-xs tracking-widest uppercase transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    SAVE RECORD
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}

    {/* CUSTOM DELETE CONFIRMATION MODAL */}
    {typeof document !== 'undefined' && createPortal(
      <AnimatePresence>
        {deleteConfirmItem && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmItem(null)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
            />

            {/* Modal box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md p-6 md:p-8 rounded-3xl border border-red-500/20 bg-white dark:bg-[#0c0c0d] shadow-2xl space-y-6 text-center z-10 text-left"
            >
              <div className="mx-auto w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>

              <div className="space-y-2 text-center">
                <span className="text-[10px] font-mono text-red-500 tracking-widest uppercase block font-bold">
                  ⚠️ DESTRUCTIVE SYSTEM ACTION
                </span>
                <h3 className="text-xl md:text-2xl font-sans font-black tracking-tight text-neutral-900 dark:text-white uppercase">
                  Confirm Deletion
                </h3>
                <p className="text-xs text-neutral-550 dark:text-[#71717a]">
                  This action is permanent and cannot be reverted. This record will be instantly purged from database collections.
                </p>
              </div>

              {/* Target item showcase */}
              <div className="bg-red-500/5 dark:bg-red-500/[0.02] border border-red-500/15 rounded-xl p-4 text-xs font-mono text-neutral-800 dark:text-zinc-300 break-all max-h-24 overflow-y-auto">
                <span className="text-[9px] text-red-500 dark:text-red-400 block mb-1 uppercase tracking-wider font-bold">TARGET INSTANCE:</span>
                <span className="font-bold">{deleteConfirmItem.title || 'Selected record'}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmItem(null)}
                  className="px-5 py-3 rounded-xl border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-zinc-400 hover:text-neutral-950 dark:hover:text-white font-mono text-xs tracking-widest uppercase transition-all cursor-pointer font-bold bg-transparent"
                >
                  ABORT
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(deleteConfirmItem.id)}
                  className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-mono font-bold text-xs tracking-widest uppercase transition-all hover:shadow-lg hover:shadow-red-500/25 cursor-pointer border-0"
                >
                  <Trash2 className="w-4 h-4" />
                  ERASE NOW
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}

    {/* CUSTOM LOGOUT CONFIRMATION MODAL */}
    {typeof document !== 'undefined' && createPortal(
      <AnimatePresence>
        {logoutConfirmOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLogoutConfirmOpen(false)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
            />

            {/* Modal box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md p-6 md:p-8 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0c0d] shadow-2xl space-y-6 text-center z-10 text-left"
            >
              <div className="mx-auto w-14 h-14 rounded-2xl bg-[#00f2fe]/10 flex items-center justify-center border border-[#00f2fe]/20">
                <LogOut className="w-6 h-6 text-[#00f2fe]" />
              </div>

              <div className="space-y-2 text-center">
                <span className="text-[10px] font-mono text-[#00f2fe] tracking-widest uppercase block font-bold">
                  ● SYSTEM LOGOUT GATEWAY
                </span>
                <h3 className="text-xl md:text-2xl font-sans font-black tracking-tight text-neutral-900 dark:text-white uppercase">
                  TERMINATE SESSION?
                </h3>
                <p className="text-xs text-neutral-550 dark:text-[#71717a]">
                  Are you sure you want to log out? Your local cryptographic token will be cleared and you will have to re-authenticate with credentials to regain access.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setLogoutConfirmOpen(false)}
                  className="px-5 py-3 rounded-xl border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-zinc-400 hover:text-neutral-950 dark:hover:text-white font-mono text-xs tracking-widest uppercase transition-all cursor-pointer font-bold bg-transparent"
                >
                  STAY IN
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black font-mono font-bold text-xs tracking-widest uppercase transition-all hover:shadow-lg hover:shadow-[#00f2fe]/20 cursor-pointer border-0"
                >
                  <LogOut className="w-4 h-4" />
                  LOG OUT
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </div>
  );
}
