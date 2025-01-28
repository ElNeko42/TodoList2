export interface Task {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    status: string; // "Pendiente" | "Haciendo" | "Hecho"
    createdAt?: string; 
}

export interface CreateTaskDto {
    title: string;
    description: string;
    isCompleted: boolean;
    status?: string; // "Pendiente" | "Haciendo" | "Hecho"
  }
  