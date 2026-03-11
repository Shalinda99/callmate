import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Calendar, PhoneCall, Settings } from 'lucide-react';

const Sidebar = () => {
    const links = [
        { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
        { name: 'Doctors', path: '/doctors', icon: <Users size={20} /> },
        { name: 'Appointments', path: '/appointments', icon: <Calendar size={20} /> },
        { name: 'Call Logs', path: '/calls', icon: <PhoneCall size={20} /> },
        { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="h-screen w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800 shadow-xl fixed left-0 top-0">
            <div className="p-6 flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-tr from-blue-500 to-indigo-500 p-2 rounded-xl shadow-lg shadow-blue-500/30">
                    <PhoneCall size={24} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 tracking-tight">
                    CallMate<span className="text-blue-500">.</span>
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                ? 'bg-blue-600/10 text-blue-400 font-medium'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                            }`
                        }
                    >
                        {link.icon}
                        <span>{link.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 mb-4">
                <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20">
                            A
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">Admin User</p>
                            <p className="text-xs text-emerald-400 flex items-center mt-0.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                                Online
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
