# Server-only MDM adapters

Implement the HTTP contract expected by `src/features/mdm/httpAdapter.ts` on a trusted backend.

Routes:
- GET `/api/mdm/:provider/capabilities`
- GET `/api/mdm/:provider/devices/:id`
- POST `/api/mdm/:provider/devices/:id/approved-wipe`
- GET `/api/mdm/:provider/requests/:id`

Requirements:
- Keep OAuth credentials and service-account credentials server-side.
- Verify tenant, technician role, ownership record, and written authorization.
- Record the request in the audit store before provider execution.
- Use the provider's supported management APIs only.
- Never expose generic command execution to the browser.
