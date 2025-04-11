export interface POC {
  name: string;
  title: string;
  email: string;
}

export interface CompanyProfile {
  company_name: string;
  service_line: string[];
  company_description: string;
  tier1_keywords: string[];
  tier2_keywords: string[];
  emails: string[];
  poc: POC[];
}

export interface ServiceLine {
  id: string;
  name: string;
  description?: string;
} 