export type StaffRole='owner'|'manager'|'technician'|'intake'|'auditor';
export type Permission='repair.create'|'repair.advance'|'unlock.create'|'unlock.approve'|'mdm.request'|'audit.read';
const grants:Record<StaffRole,Permission[]>={
 owner:['repair.create','repair.advance','unlock.create','unlock.approve','mdm.request','audit.read'],
 manager:['repair.create','repair.advance','unlock.create','unlock.approve','mdm.request','audit.read'],
 technician:['repair.create','repair.advance','unlock.create','audit.read'],
 intake:['repair.create','unlock.create'],
 auditor:['audit.read']
};
export const can=(role:StaffRole,permission:Permission)=>grants[role].includes(permission);
