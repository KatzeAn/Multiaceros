export interface AbsenceRequest {
    id?: number | string
    from: string
    to: string
    type: string
    comment: string
    evidencePath: string
    requestedById: string
}