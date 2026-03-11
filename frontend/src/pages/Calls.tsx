import React from 'react';
import { PhoneOutgoing, PhoneIncoming, PhoneMissed, PlayCircle } from 'lucide-react';

export default function Calls() {
    const calls = [
        { id: 'CALL-001', phone: '+1 (555) 123-4567', type: 'incoming', date: 'Today, 10:30 AM', duration: '2m 15s', status: 'Booked Appointment', recording: true },
        { id: 'CALL-002', phone: '+1 (555) 987-6543', type: 'incoming', date: 'Today, 09:15 AM', duration: '4m 30s', status: 'Inquiry', recording: true },
        { id: 'CALL-003', phone: '+1 (555) 456-7890', type: 'missed', date: 'Yesterday, 04:45 PM', duration: '0s', status: 'Missed Call', recording: false },
        { id: 'CALL-004', phone: '+1 (555) 234-5678', type: 'outgoing', date: 'Yesterday, 02:20 PM', duration: '1m 10s', status: 'Confirmed Booking', recording: false },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Call Logs</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">History of all incoming and outgoing AI calls</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                    {calls.map((call) => (
                        <li key={call.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className={`p-3 rounded-2xl ${call.type === 'incoming' ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' :
                                        call.type === 'missed' ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400' :
                                            'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
                                    }`}>
                                    {call.type === 'incoming' && <PhoneIncoming size={20} />}
                                    {call.type === 'outgoing' && <PhoneOutgoing size={20} />}
                                    {call.type === 'missed' && <PhoneMissed size={20} />}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white text-lg">{call.phone}</p>
                                    <p className="text-sm text-slate-500 flex items-center mt-1">
                                        {call.date} • {call.duration}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 sm:mt-0 flex items-center justify-between sm:w-1/3">
                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${call.type === 'missed' ? 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700' :
                                        'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20'
                                    }`}>
                                    {call.status}
                                </span>

                                {call.recording ? (
                                    <button className="flex items-center space-x-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm transition-colors">
                                        <PlayCircle size={18} />
                                        <span>Play Audio</span>
                                    </button>
                                ) : (
                                    <span className="text-sm text-slate-400">No Audio</span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
