import React from 'react';
import { Activity, Clock, CalendarCheck, PhoneIncoming } from 'lucide-react';

const StatCard = ({ title, value, icon, trend, color }: any) => (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{value}</h3>
            </div>
            <div className={`p-3 rounded-2xl ${color}`}>
                {icon}
            </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
            <span className="text-emerald-500 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-lg">{trend}</span>
            <span className="text-slate-500 dark:text-slate-400 ml-2">vs last week</span>
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back. Here's what's happening today.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/30 transition-all active:scale-95">
                    Generate Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard
                    title="Total Calls Today"
                    value="142"
                    trend="+12%"
                    icon={<PhoneIncoming size={24} className="text-blue-600 dark:text-blue-400" />}
                    color="bg-blue-100 dark:bg-blue-500/20"
                />
                <StatCard
                    title="Appointments Booked"
                    value="48"
                    trend="+8%"
                    icon={<CalendarCheck size={24} className="text-emerald-600 dark:text-emerald-400" />}
                    color="bg-emerald-100 dark:bg-emerald-500/20"
                />
                <StatCard
                    title="Active Doctors"
                    value="12"
                    trend="0%"
                    icon={<Activity size={24} className="text-purple-600 dark:text-purple-400" />}
                    color="bg-purple-100 dark:bg-purple-500/20"
                />
                <StatCard
                    title="Avg. Call Duration"
                    value="1m 34s"
                    trend="-5%"
                    icon={<Clock size={24} className="text-amber-600 dark:text-amber-400" />}
                    color="bg-amber-100 dark:bg-amber-500/20"
                />
            </div>

            {/* Activity Section Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[400px]">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Call Volume & Bookings</h3>
                    <div className="h-64 flex items-end justify-between gap-2 px-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                        {/* Simple Mock Chart Bar */}
                        {[40, 60, 45, 80, 50, 90, 70].map((h, i) => (
                            <div key={i} className="w-full relative group">
                                <div className="absolute bottom-full mb-2 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold text-slate-600 dark:text-slate-300">{h}</div>
                                <div style={{ height: `${h}%` }} className="bg-gradient-to-t from-blue-500 to-indigo-400 rounded-t-lg mx-1 w-full transition-all duration-500 hover:opacity-80"></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between px-4 mt-3 text-xs text-slate-500">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Calls</h3>
                    <div className="space-y-4">
                        {[
                            { caller: "+1 (555) 123-4567", status: "Booked", time: "10m ago" },
                            { caller: "+1 (555) 987-6543", status: "Inquiry", time: "25m ago" },
                            { caller: "+1 (555) 456-7890", status: "Cancelled", time: "1h ago" },
                            { caller: "+1 (555) 234-5678", status: "Booked", time: "2h ago" },
                            { caller: "+1 (555) 345-6789", status: "Booked", time: "3h ago" }
                        ].map((call, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${call.status === 'Booked' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : call.status === 'Cancelled' ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                                        <PhoneIncoming size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{call.caller}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{call.time}</p>
                                    </div>
                                </div>
                                <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${call.status === 'Booked' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : call.status === 'Cancelled' ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400' : 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                                    {call.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
