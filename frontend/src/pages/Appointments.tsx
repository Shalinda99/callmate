import React from 'react';
import { CalendarCheck, PhoneOutgoing, Clock } from 'lucide-react';

export default function Appointments() {
    // Static view for now, usually would fetch from /api/appointments
    const mockAppointments = [
        { id: 'BKG-A1B2C3', patient: 'Michael Robinson', doctor: 'Dr. Sarah Perera', date: '2026-03-12', time: '10:30 AM', status: 'Confirmed' },
        { id: 'BKG-D4E5F6', patient: 'Emma Watson', doctor: 'Dr. Emily Silva', date: '2026-03-12', time: '11:00 AM', status: 'Pending' },
        { id: 'BKG-X7Y8Z9', patient: 'John Doe', doctor: 'Dr. James Fernando', date: '2026-03-13', time: '09:00 AM', status: 'Confirmed' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Appointments</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">View and manage scheduled patient visits</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Upcoming Appointments</h3>

                <div className="space-y-4">
                    {mockAppointments.map((app) => (
                        <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl">
                                    <CalendarCheck size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{app.patient}</h4>
                                    <div className="flex items-center space-x-4 mt-1">
                                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{app.doctor}</span>
                                        <span className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                                            <Clock size={12} className="mr-1" />
                                            {app.date} • {app.time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 sm:mt-0 flex flex-col items-end">
                                <span className={`px-3 py-1 text-xs font-bold rounded-lg mb-2 ${app.status === 'Confirmed'
                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                                        : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                                    }`}>
                                    {app.status}
                                </span>
                                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">ID: {app.id}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
