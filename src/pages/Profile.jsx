import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Profile() {
    const { user, updateUser, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    const [form, setForm] = useState(user);

    const handleImage = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();

        reader.onloadend = () => {
            setForm({ ...form, avatar: reader.result });
        };

        if (file) reader.readAsDataURL(file);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        updateUser(form);
        setIsEditing(false);
    };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                    <img
                        src={form.avatar || "https://i.pravatar.cc/150"}
                        className="w-24 h-24 rounded-full object-cover border"
                    />

                    {isEditing && (
                        <input
                            type="file"
                            onChange={handleImage}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    )}
                </div>

                <div>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Name */}
                <div>
                    <label className="text-sm text-gray-500">Name</label>
                    <input
                        name="name"
                        value={form.name}
                        disabled={!isEditing}
                        onChange={handleChange}
                        className={`w-full border px-3 py-2 rounded ${
                            !isEditing && "bg-gray-100"
                        }`}
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <input
                        name="email"
                        value={form.email}
                        disabled
                        className="w-full border px-3 py-2 rounded bg-gray-100"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <input
                        name="phone"
                        value={form.phone}
                        disabled={!isEditing}
                        onChange={handleChange}
                        placeholder="Add Phone Number"
                        className={`w-full border px-3 py-2 rounded ${
                            !isEditing && "bg-gray-100"
                        }`}
                    />
                </div>
            </div>

            <div className="flex gap-4 mt-6">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-300 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>               
                    </>
                ): (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-black text-white px-4 py-2 rounded"
                    >
                        Edit Profile
                    </button>
                )}

                <button
                    onClick={logout}
                    className="ml-auto bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
  )
}
