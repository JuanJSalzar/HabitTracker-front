export type HabitStatus = 'Uncompleted' | 'OnGoing' | 'Completed' | 'Pending';

// --- GET ----
export interface Habit {
    id: number;
    name: string;
    description?: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    currentLog?: HabitLog;
}

export interface HabitLog {
    isCompleted: HabitStatus;
    notes?: string;
    startTime: string;
    duration?: string;
}

// --- POST ----

export interface CreateHabitRequest {
    name: string;
    description?: string;
    currentLog?: HabitLogRequest;
}

export interface HabitLogRequest {
    isCompleted: HabitStatus;
    notes?: string;
    startTime: string;
    duration?: string;
}

// --- PUT ----

export interface UpdateHabitRequest {
    name: string;
    description?: string;
    currentLog?: HabitLogRequest;
}