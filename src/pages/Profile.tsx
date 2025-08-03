import { useEffect, useState } from "react";
import {
  type ChangePasswordDto,
  type UpdateUserDto,
  type UserDto,
} from "../types/user";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Trash2, UserIcon } from "lucide-react";
import ConfirmDeleteAccountModal from "../components/ConfirmDeleteAccountModal";
import toast from "react-hot-toast";
import { API_BASE } from "../config";
import React from "react";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <label className="block mb-1 text-gray-200 z-10 relative">{label}</label>
    <input
      type={type}
      className="w-full border border-white/20 rounded-lg px-3 py-2 bg-white/10 backdrop-blur-lg
      focus:outline-none focus:ring-2 focus:ring-purple-600 text-white placeholder:text-gray-400 transition z-10 relative"
      value={value}
      onChange={onChange}
    />
  </div>
);

const Profile = () => {
  const { token, logout } = useAuth();

  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [updateData, setUpdateData] = useState<UpdateUserDto>({
    name: "",
    lastName: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState<ChangePasswordDto>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/User/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error fetching profile");
      const data: UserDto = await res.json();
      setUser(data);
      setUpdateData({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateData.name.trim().length < 3)
      return toast.error("Name must be at least 3 characters long");
    if (updateData.lastName.trim().length < 5)
      return toast.error("Last name must be at least 5 characters long");
    if (!/\S+@\S+\.\S+/.test(updateData.email))
      return toast.error("Invalid email format");

    try {
      const res = await fetch(`${API_BASE}/api/User/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) throw new Error("Error updating profile");
      toast.success("Profile updated");
      await fetchProfile();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmNewPassword
    )
      return toast.error("All fields are required");
    if (passwordData.newPassword !== passwordData.confirmNewPassword)
      return toast.error("Passwords do not match");
    if (passwordData.newPassword.length < 8)
      return toast.error("Minimum 8 characters");

    try {
      const res = await fetch(`${API_BASE}/api/User/me/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });
      if (!res.ok) throw new Error("Error changing password");
      toast.success("Password updated");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/User/me`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error deleting account");
      toast.success("Account deleted");
      logout();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080112] to-[#0e0121] flex flex-col">
      <div className="max-w-5xl mx-auto p-6 space-y-6 flex-grow">
        <h1 className="text-3xl font-bold text-gray-100">Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl md:col-span-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"></div>
            <div className="flex items-center gap-2 mb-4 border-b pb-2 border-white/10">
              <UserIcon size={20} className="text-white" />
              <h2 className="text-xl font-semibold text-gray-100">
                Information
              </h2>
            </div>
            {loading ? (
              <p className="text-gray-300">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : user ? (
              <>
                <p>
                  <strong className="text-white">Name:</strong>{" "}
                  <span className="text-gray-300">{user.name}</span>
                </p>
                <p>
                  <strong className="text-white">Last Name:</strong>{" "}
                  <span className="text-gray-300">{user.lastName}</span>
                </p>
                <p>
                  <strong className="text-white">Email:</strong>{" "}
                  <span className="text-gray-300">{user.email}</span>
                </p>
                <p>
                  <strong className="text-white">Created:</strong>{" "}
                  <span className="text-gray-300">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </>
            ) : (
              <p>No data available.</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
            <div className="relative bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"></div>
              <div className="flex items-center gap-2 mb-4 border-b pb-2 border-white/10">
                <Mail size={20} className="text-white" />
                <h2 className="text-xl font-semibold text-gray-100">
                  Edit Profile
                </h2>
              </div>
              <form onSubmit={handleUpdate} className="space-y-4">
                <Input
                  label="Name"
                  value={updateData.name}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, name: e.target.value })
                  }
                />
                <Input
                  label="Last Name"
                  value={updateData.lastName}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, lastName: e.target.value })
                  }
                />
                <Input
                  label="Email"
                  type="email"
                  value={updateData.email}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, email: e.target.value })
                  }
                />
                <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
                  Save Changes
                </button>
              </form>
            </div>

            <div className="relative bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"></div>
              <div className="flex items-center gap-2 mb-4 border-b pb-2 border-white/10">
                <Lock size={20} className="text-white" />
                <h2 className="text-xl font-semibold text-gray-100">
                  Change Password
                </h2>
              </div>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                />
                <Input
                  label="New Password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={passwordData.confirmNewPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmNewPassword: e.target.value,
                    })
                  }
                />
                <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
                  Change Password
                </button>
              </form>
            </div>

            <div className="relative bg-white/10 backdrop-blur-lg border border-red-600 rounded-2xl p-6 shadow-xl md:col-span-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"></div>
              <div className="flex items-center gap-2 mb-4 border-b pb-2 border-white/10">
                <Trash2 size={20} className="text-red-500" />
                <h2 className="text-xl font-semibold text-red-500">
                  Delete Account
                </h2>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                This action will permanently delete your account and all your
                information. You won't be able to recover it afterwards.
              </p>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2 transition"
              >
                <Trash2 size={16} />
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <ConfirmDeleteAccountModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteAccount}
        />
      </div>
    </div>
  );
};

export default Profile;
