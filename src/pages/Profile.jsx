import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { User, Phone, Mail, Camera, LogOut, CheckCircle2, ShieldAlert } from "lucide-react";
import api from "../services/api";

export default function Profile() {
    const { user, updateUser, logout } = useAuth();
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState(user);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    
    const fileInputRef = useRef(null);

    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setForm({ ...form, avatar: reader.result });
        };

        if (file) reader.readAsDataURL(file);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setSaving(true);
        setError("");
        
        try {
            const res = await api.put("accounts/profile/", form);
            updateUser(res.data.data);
            setIsEditing(false);
        } catch (err) {
            setError("Failed to update profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        clearCart();
        navigate("/"); 
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Account Settings</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">Manage your profile information and account preferences.</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50 rounded-xl transition-all duration-200"
                >
                    <LogOut size={16} />
                    Log out
                </button>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl shadow-xl shadow-zinc-200/40 dark:shadow-none overflow-hidden">
                {/* Profile Header Header/Banner block */}
                <div className="p-6 sm:p-8 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50 flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-2xl bg-zinc-950 dark:bg-zinc-800 text-white flex items-center justify-center text-3xl font-bold shadow-md overflow-hidden border-4 border-white dark:border-zinc-900">
                            {form.avatar || user.avatar ? (
                                <img src={form.avatar || user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                user.name?.charAt(0).toUpperCase()
                            )}
                        </div>
                        {isEditing && (
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white"
                                title="Upload new photo"
                            >
                                <Camera size={20} />
                            </button>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImage}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                    
                    <div className="text-center sm:text-left flex-1">
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
                            {user.name}
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-0.5">{user.email}</p>
                        <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-lg">
                            <CheckCircle2 size={12} />
                            Verified Account
                        </div>
                    </div>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mx-6 sm:mx-8 mt-6 bg-rose-50 border border-rose-100 text-rose-800 dark:bg-rose-950/30 dark:border-rose-900/50 dark:text-rose-400 rounded-xl px-4 py-3 text-sm flex items-center gap-2.5">
                        <ShieldAlert size={18} className="shrink-0" />
                        {error}
                    </div>
                )}

                {/* Info Fields Form Grid */}
                <div className="p-6 sm:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Full Name</label>
                            <div className="relative">
                                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
                                <input
                                    name="name"
                                    value={form.name}
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-2.5 border rounded-xl font-medium text-sm transition-all duration-200
                                        ${!isEditing 
                                            ? "bg-zinc-50/70 border-zinc-200/60 text-zinc-500 dark:bg-zinc-800/40 dark:border-zinc-800 dark:text-zinc-400 opacity-90 cursor-not-allowed" 
                                            : "bg-white border-zinc-300 dark:bg-zinc-950 dark:border-zinc-700 dark:text-white focus:outline-none focus:ring-4 focus:ring-zinc-500/10 focus:border-zinc-900 dark:focus:border-zinc-400"
                                        }`}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Email Address</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
                                <input
                                    value={user.email}
                                    disabled
                                    className="w-full pl-10 pr-4 py-2.5 border border-zinc-200/60 bg-zinc-50/70 text-zinc-400 dark:bg-zinc-800/40 dark:border-zinc-800 dark:text-zinc-500 font-medium text-sm rounded-xl cursor-not-allowed opacity-70"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Phone Number</label>
                            <div className="relative">
                                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
                                <input
                                    name="phone"
                                    value={form.phone}
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    placeholder="Add phone number"
                                    className={`w-full pl-10 pr-4 py-2.5 border rounded-xl font-medium text-sm transition-all duration-200
                                        ${!isEditing 
                                            ? "bg-zinc-50/70 border-zinc-200/60 text-zinc-500 dark:bg-zinc-800/40 dark:border-zinc-800 dark:text-zinc-400 opacity-90 cursor-not-allowed" 
                                            : "bg-white border-zinc-300 dark:bg-zinc-950 dark:border-zinc-700 dark:text-white focus:outline-none focus:ring-4 focus:ring-zinc-500/10 focus:border-zinc-900 dark:focus:border-zinc-400"
                                        }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Action Bar */}
                <div className="px-6 py-4 sm:px-8 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end gap-3">
                    {isEditing ? (
                        <>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 text-sm font-semibold border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 transition-colors duration-150"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-5 py-2 text-sm font-semibold bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 hover:bg-zinc-900 dark:hover:bg-white disabled:bg-zinc-300 dark:disabled:bg-zinc-800 rounded-xl transition-all shadow-sm flex items-center gap-2"
                            >
                                {saving && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-5 py-2 text-sm font-semibold bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 hover:bg-zinc-900 dark:hover:bg-white rounded-xl transition-all shadow-sm shadow-zinc-950/10 dark:shadow-none"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}