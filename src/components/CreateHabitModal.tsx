import React, { Fragment, useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";
import type { CreateHabitRequest, HabitStatus } from "../types/habits.ts";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import toast from "react-hot-toast";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { API_BASE } from "../config";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onHabitCreated: () => void;
}

const CreateHabitModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onHabitCreated,
}) => {
  const { token } = useAuth();

  const [form, setForm] = useState<CreateHabitRequest>({
    name: "",
    description: "",
    currentLog: {
      isCompleted: "Pending",
      notes: "",
      startTime: new Date().toISOString(),
      duration: "",
    },
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name in form) {
      setForm({ ...form, [name]: value });
    } else if (form.currentLog) {
      setForm({
        ...form,
        currentLog: {
          ...form.currentLog,
          [name]: value,
        },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (form.name.trim().length < 3) {
      toast.error("Name must be at least 3 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/Habit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create habit");
      }

      toast.success("Habit created!");
      onHabitCreated();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error occurred";
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const habitStatuses: HabitStatus[] = [
    "Uncompleted",
    "OnGoing",
    "Completed",
    "Pending",
  ];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl p-6 shadow-xl transition-all text-white">
              <Dialog.Title className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                Create New Habit
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-white/20 rounded px-3 py-2 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border border-white/20 rounded px-3 py-2 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block mb-1">Initial State</label>
                  <Listbox
                    value={form.currentLog?.isCompleted}
                    onChange={(value) =>
                      setForm((prev) => ({
                        ...prev,
                        currentLog: {
                          ...prev.currentLog,
                          isCompleted: value,
                        },
                      }))
                    }
                  >
                    <div className="relative">
                      <Listbox.Button className="w-full border border-white/20 rounded px-3 py-2 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-between items-center">
                        <span>{form.currentLog?.isCompleted}</span>
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                      </Listbox.Button>
                      <Listbox.Options className="absolute mt-1 w-full bg-[#1b1526] backdrop-blur-md border border-white/10 text-white rounded shadow-xl z-10 ring-1 ring-white/10 overflow-hidden">
                        {habitStatuses.map((status) => (
                          <Listbox.Option
                            key={status}
                            value={status}
                            className={({ active }) =>
                              `cursor-pointer px-4 py-2 ${
                                active ? "bg-purple-600" : "bg-transparent"
                              }`
                            }
                          >
                            {({ selected }) => (
                              <span className="flex items-center justify-between">
                                {status}
                                {selected && (
                                  <CheckIcon className="h-4 w-4 text-purple-300" />
                                )}
                              </span>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </div>

                <div>
                  <label className="block mb-1">Notes</label>
                  <input
                    type="text"
                    name="notes"
                    value={form.currentLog?.notes}
                    onChange={handleChange}
                    className="w-full border border-white/20 rounded px-3 py-2 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block mb-1">Start Time</label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    value={form.currentLog?.startTime.slice(0, 16)}
                    onChange={handleChange}
                    className="w-full border border-white/20 rounded px-3 py-2 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block mb-1">Duration (HH:MM:SS)</label>
                  <input
                    type="text"
                    name="duration"
                    value={form.currentLog?.duration}
                    onChange={handleChange}
                    className="w-full border border-white/20 rounded px-3 py-2 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400"
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-white transition"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white transition"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Habit"}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateHabitModal;
