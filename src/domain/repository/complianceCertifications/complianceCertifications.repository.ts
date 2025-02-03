import type { ComplianceCertifications } from "@/domain/Interfaces/ComplianceCertifications/ComplianceCertifcations.interface";

export abstract class ComplianceCertificationsRepository {
    abstract getComplianceCertifications(): Promise<ComplianceCertifications[]>;
    abstract createComplianceCertification(data: ComplianceCertifications): Promise<ComplianceCertifications>;
    abstract deleteComplianceCertification(id: string): Promise<ComplianceCertifications>;
    abstract updateComplianceCertification(id: string, data: ComplianceCertifications): Promise<ComplianceCertifications>;
    abstract getEmployeeCompilationCertifications(employeeId: string): Promise<ComplianceCertifications[]>;
}