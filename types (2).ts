export type DeviceKind='Cell Phone'|'Tablet'|'Laptop'|'Desktop';
export type RepairStatus='Received'|'Diagnosing'|'Estimate'|'Customer Approval'|'In Repair'|'Quality Check'|'Ready for Pickup'|'Completed';
export interface RepairJob{id:string;ticketNumber:string;customerName:string;deviceKind:DeviceKind;manufacturer:string;model:string;issue:string;status:RepairStatus;authorized:boolean;createdAt:string}
export type UnlockService='Carrier Eligibility'|'Owner Verification'|'Official Account Recovery'|'Enterprise Recovery'|'OS Restore / Reinstall'|'Device Migration'|'Data Transfer';
export interface UnlockCase{id:string;ticketNumber:string;service:UnlockService;device:string;carrier?:string;ownershipVerified:boolean;authorizationRecorded:boolean;status:'Intake'|'Verification'|'Submitted'|'Waiting Provider'|'Approved'|'Completed'|'Escalated';notes:string}
export interface AuditInput{action:string;entityType:string;entityId:string;outcome:string;details?:Record<string,unknown>}
