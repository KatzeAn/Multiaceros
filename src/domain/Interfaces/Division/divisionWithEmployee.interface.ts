export interface EmployeeJobTitle {
    employeeName: string,
    jobTitle: string
}

export interface DivisionWithEmployee {
    divisionName: string,
    employees: EmployeeJobTitle[]
}