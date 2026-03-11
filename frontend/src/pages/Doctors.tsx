import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserPlus, Activity, ActivityIcon, Plus } from 'lucide-react';

export default function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // We are running vite dev server on 5173, backend on 8000
        axios.get('http://localhost:8000/api/doctors/')
            .then(res => {
                setDoctors(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Doctors Management</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage clinic staff and their working hours</p>
                </div>
                <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/30 transition-all active:scale-95">
                    <Plus size={18} />
                    <span>Add Doctor</span>
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm">
                                <th className="py-4 px-6 font-medium">Doctor Name</th>
                                <th className="py-4 px-6 font-medium">Specialty</th>
                                <th className="py-4 px-6 font-medium">Working Days</th>
                                <th className="py-4 px-6 font-medium">Hours</th>
                                <th className="py-4 px-6 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-slate-500">Loading doctors...</td>
                                </tr>
                            ) : doctors.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-slate-500">No doctors found.</td>
                                </tr>
                            ) : (
                                doctors.map((doc: any) => (
                                    <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                                                    {doc.name.replace('Dr. ', '').charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900 dark:text-white">{doc.name}</p>
                                                    <p className="text-xs text-slate-500">ID: DOC-{doc.id.toString().padStart(4, '0')}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
                                                {doc.specialty}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                {doc.working_days.split(',').map((day: string) => (
                                                    <span key={day} className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">
                                                        {day.substring(0, 3)}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">
                                            {doc.working_hours_start.substring(0, 5)} - {doc.working_hours_end.substring(0, 5)}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm transition-colors">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
