export type ComplianceDocument = {
  id: number;
  type: DocumentType;
  file: {
    id: number;
    key: string;
  };
};
