export type MdmProviderId='android-management-api'|'microsoft-intune'|'generic';
export interface ManagedDeviceRef{provider:MdmProviderId;externalId:string;displayName:string;managementMode?:string}
export interface MdmCapabilities{inventory:boolean;compliance:boolean;approvedWipe:boolean;reboot:boolean;reEnroll:boolean}
export interface MdmActionResult{requestId:string;status:'queued'|'completed'|'failed';providerMessage?:string}
export interface MdmProviderAdapter{id:MdmProviderId;name:string;capabilities():Promise<MdmCapabilities>;getDevice(id:string):Promise<ManagedDeviceRef>;requestApprovedWipe(device:ManagedDeviceRef,reason:string):Promise<MdmActionResult>;getRequestStatus(requestId:string):Promise<MdmActionResult>}
