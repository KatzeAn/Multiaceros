import type { ComplianceCertifications } from "@/domain/Interfaces/ComplianceCertifications/ComplianceCertifcations.interface";
import type { ComplianceCertificationsRepository } from "@/domain/repository/complianceCertifications/complianceCertifications.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class ComplianceCertificationModel implements ComplianceCertificationsRepository {
    getComplianceCertifications(): Promise<ComplianceCertifications[]> {
        return apiRequest<ComplianceCertifications[]>("get", "/ComplianceCertifications");
    }
    createComplianceCertification(data: ComplianceCertifications): Promise<ComplianceCertifications> {
        return apiRequest<ComplianceCertifications>("post", "/ComplianceCertifications/CreateComplianceCertifications", { data });
    }
    deleteComplianceCertification(id: string): Promise<ComplianceCertifications> {
        return apiRequest<ComplianceCertifications>("patch", `/ComplianceCertifications/${id}/ComplianceCertificationsDelete`);
    }
    updateComplianceCertification(id: string, data: ComplianceCertifications): Promise<ComplianceCertifications> {
        return apiRequest<ComplianceCertifications>("put", `/ComplianceCertifications/${id}/UpdateComplianceCertifications`, { data });
    }
    getEmployeeCompilationCertifications(employeeId: string): Promise<ComplianceCertifications[]> {
        return apiRequest<ComplianceCertifications[]>("get", `/ComplianceCertifications/${employeeId}/employee-compilation-certification`);
    }
}