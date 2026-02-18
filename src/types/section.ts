export interface Topic {
    id: string;                    // "1.1"
    title: string;
    titleHe?: string;
    description: string;
    route: string;
}

export interface Section {
    id: number;                    // 1-5
    title: string;
    titleHe?: string;
    description: string;
    color: string;                 // Tailwind color class
    icon: string;                  // Lucide icon name
    weight: number;                // Percentage (15, 22, 18, 28, 17)
    topics: Topic[];
}
