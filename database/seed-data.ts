interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Pendiente: lel",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "En-Progreso: Lorem ipsum 3",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description: "Terminadas: El anacleto",
      status: "finished",
      createdAt: Date.now() - 10000,
    },
  ],
};
