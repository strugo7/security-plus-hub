export const config = {
    app: {
        name: 'Security+ & SecOps Hub',
        version: '1.0.0',
        description: 'CompTIA Security+ (SY0-701) & SecOps Training Platform',
    },
    exam: {
        totalQuestions: 90,
        timeLimitMinutes: 90,
        passingScore: 750,
        maxScore: 900,
    },
    spacedRepetition: {
        intervals: [1, 3, 7, 14, 30], // days
    },
    storageKeys: {
        PROGRESS: 'secops_hub_progress',
        SETTINGS: 'secops_hub_settings',
        AUTH: 'secops_hub_auth', // Placeholder if needed later
    }
};
