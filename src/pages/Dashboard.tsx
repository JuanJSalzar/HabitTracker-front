import { useAuth } from "../context/AuthContext.tsx";
import { useEffect, useState } from "react";
import type { Habit } from "../types/habits.ts";
import CreateHabitModal from "../components/CreateHabitModal.tsx";
import EditHabitModal from "../components/EditHabitModal.tsx";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.tsx";
import ChatBotModal from "../components/ChatBotModal.tsx";

const Dashboard = () => {
  const { token } = useAuth();

  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);

  const fetchHabits = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5237/api/Habit", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch habits");
      }

      const data: Habit[] = await response.json();
      setHabits(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error occurred while fetching habits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [token]);

  const handleOpenEdit = (habit: Habit) => {
    setSelectedHabit(habit);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (habit: Habit) => {
    setHabitToDelete(habit);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!habitToDelete) return;
    toast.loading("Deleting habit...");
    try {
      const response = await fetch(
        `http://localhost:5237/api/Habit/${habitToDelete.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete habit");
      }

      toast.dismiss();
      toast.success("Habit deleted successfully");
      fetchHabits();
    } catch (err: unknown) {
      toast.dismiss();
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Unknown error occurred while deleting habit");
    }
  };

  const getHoverBorderColor = (status: string | undefined) => {
    switch (status) {
      case "Completed":
        return "hover:border-green-500";
      case "OnGoing":
        return "hover:border-blue-500";
      case "Pending":
        return "hover:border-yellow-500";
      case "Uncompleted":
        return "hover:border-red-500";
      default:
        return "hover:border-purple-400";
    }
  };

  const completed = habits.filter(
    (h) => h.currentLog?.isCompleted === "Completed"
  ).length;
  const pending = habits.filter(
    (h) => h.currentLog?.isCompleted === "Pending"
  ).length;
  const ongoing = habits.filter(
    (h) => h.currentLog?.isCompleted === "OnGoing"
  ).length;
  const uncompleted = habits.filter(
    (h) => h.currentLog?.isCompleted === "Uncompleted"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080112] to-[#0e0121] flex flex-col">
      <div className="max-w-5xl w-full mx-auto p-6 flex-grow space-y-6">
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 text-gray-100 shadow-xl">
          <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"></div>
          <span>🔥 Today you have:</span>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <span>✅ {completed} completed</span>
            <span>⏳ {pending} pendings</span>
            <span>🕐 {ongoing} ongoing</span>
            <span>❌ {uncompleted} uncompleted</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-100">Your Habits</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center space-x-2 transition-colors"
          >
            <Plus size={18} />
            <span>Create Habit</span>
          </button>
        </div>

        {loading && (
          <div className="text-center mt-10 text-gray-100">
            Loading habits...
          </div>
        )}
        {error && <div className="text-center mt-10 text-red-500">{error}</div>}

        {!loading &&
          !error &&
          (habits.length === 0 ? (
            <p className="text-gray-100">You don't have habits yet</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className={`relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-xl 
                                        group transition-all duration-300 
                                        hover:scale-[1.02] hover:-rotate-[0.8deg] hover:shadow-2xl
                                        ${getHoverBorderColor(
                                          habit.currentLog?.isCompleted ??
                                            "Pending"
                                        )}`}
                >
                  <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none"></div>

                  <span
                    className={`absolute top-3 right-3 w-3 h-3 rounded-full ${
                      habit.currentLog?.isCompleted === "Completed"
                        ? "bg-green-500"
                        : habit.currentLog?.isCompleted === "OnGoing"
                        ? "bg-blue-500"
                        : habit.currentLog?.isCompleted === "Pending"
                        ? "bg-yellow-500"
                        : habit.currentLog?.isCompleted === "Uncompleted"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  ></span>

                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-gray-100">
                      {habit.name}
                    </h2>
                    <div className="opacity-0 group-hover:opacity-100 transition flex space-x-2">
                      <button
                        onClick={() => handleOpenEdit(habit)}
                        className="text-purple-400 hover:text-purple-600"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(habit)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {habit.description && (
                    <p className="text-sm text-gray-400 mb-2">
                      {habit.description}
                    </p>
                  )}

                  {habit.currentLog && (
                    <div className="text-sm text-gray-300 space-y-1">
                      <p>
                        <span className="font-semibold">State:</span>{" "}
                        {habit.currentLog.isCompleted}
                      </p>
                      {habit.currentLog.notes && (
                        <p>
                          <span className="font-semibold">Notes:</span>{" "}
                          {habit.currentLog.notes}
                        </p>
                      )}
                      <p>
                        <span className="font-semibold">Start:</span>{" "}
                        {new Date(
                          habit.currentLog.startTime
                        ).toLocaleDateString()}
                      </p>
                      {habit.currentLog.duration && (
                        <p>
                          <span className="font-semibold">Duration:</span>{" "}
                          {habit.currentLog.duration}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>

      <CreateHabitModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onHabitCreated={fetchHabits}
      />
      {selectedHabit && (
        <EditHabitModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          habit={selectedHabit}
          onHabitUpdated={fetchHabits}
        />
      )}
      {habitToDelete && (
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          habitName={habitToDelete.name}
        />
      )}
      <ChatBotModal />
    </div>
  );
};

export default Dashboard;
