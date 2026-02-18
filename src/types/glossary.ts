export interface GlossaryTerm {
    id: string;
    term: string;
    definition: string;
    hebrewTerm?: string;           // Hebrew translation
    category: string;              // "Cryptography", "Network", etc.
    relatedTerms?: string[];
    section?: string;              // Link to section ID
}
