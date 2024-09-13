type Purpose = {
  purpose: string;
  description: string;
};

// Define the type for the PURPOSE_CONSTANTS object
type PurposeConstants = {
  [key: string]: Purpose;
};

export const PURPOSE_CONSTANTS: PurposeConstants = {
  ACADEMIC_REQUIREMENT: {
    purpose: "Academic Requirement/s",
    description: "For general academic projects, assignments, or coursework",
  },
  ORG_ACTIVITY: {
    purpose: "Organization Activity",
    description: "For org or club-related events and activities",
  },
  UPSKILLING: {
    purpose: "Upskilling",
    description: "For skill development",
  },
  HOBBY: {
    purpose: "Hobby",
    description: "For hobbies or leisure activities",
  },
  SPECIAL_EVENT: {
    purpose: "Special Event",
    description: "For special events or occasions",
  },
  OTHERS: {
    purpose: "Other",
    description: "Borrower will indicate his specific purpose",
  },
} as const;

// Extract keys as a tuple of string literals
export const PURPOSE_CONSTANTS_KEYS = Object.keys(PURPOSE_CONSTANTS) as Array<
  keyof typeof PURPOSE_CONSTANTS
>;
