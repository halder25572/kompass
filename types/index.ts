export interface Book {
  id: string;
  title: string;
  pages: number;
  dueDate: string;
  status: "In Progress" | "Completed" | "Draft";
  progress: number;
}

export interface Activity {
  id: string;
  message: string;
  timeAgo: string;
  color: "rose" | "blue" | "green";
}

export interface User {
  name: string;
  email: string;
}

export interface CompanyDetails {
  company_name: string;
  street_address: string;
  postal_code: string;
  city: string;
  country: string;
  represented_by_name: string;
  represented_by_position: string;
}

export interface ContactInformation {
  phone: string;
  email: string;
  website: string | null;
}

export interface RegistrationTax {
  register_court: string;
  registration_number: string;
  vat_number: string;
}

export interface EditorialResponsibility {
  responsible_person_name: string;
  responsible_company_name: string;
  responsible_address: string;
  responsible_postal_code: string;
  responsible_city: string;
}

export interface LegalInformation {
  company_details: CompanyDetails;
  contact_information: ContactInformation;
  registration_tax: RegistrationTax;
  editorial_responsibility: EditorialResponsibility;
}

export interface LegalInformationResponse {
  success: boolean;
  message: string;
  data: LegalInformation;
  meta: Record<string, unknown>;
  code: number;
}

export interface PrivacyPolicyItem {
  id: number;
  title: string;
  description: string;
  status: number;
}

export interface PrivacyPoliciesResponse {
  success: boolean;
  message: string;
  data: PrivacyPolicyItem[];
  meta: Record<string, unknown>;
  code: number;
}

export interface TermsConditionsItem {
  id: number;
  title: string;
  description: string;
  status: number;
}

export interface TermsConditionsResponse {
  success: boolean;
  message: string;
  data: TermsConditionsItem[];
  meta: Record<string, unknown>;
  code: number;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  status: number;
}

export interface FaqsResponse {
  success: boolean;
  message: string;
  data: FaqItem[];
  meta: Record<string, unknown>;
  code: number;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data: [];
  meta: Record<string, unknown>;
  code: number;
}