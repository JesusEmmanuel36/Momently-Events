export class AppError extends Error {
  constructor(message, status = 500, code = "internal_error") { super(message); this.status = status; this.code = code; }
}
export class UnauthorizedError extends AppError { constructor(message = "Inicia sesión para continuar.") { super(message, 401, "unauthorized"); } }
export class ForbiddenError extends AppError { constructor(message = "No tienes permisos para realizar esta acción.") { super(message, 403, "forbidden"); } }
export class NotFoundError extends AppError { constructor(message = "El recurso solicitado no existe.") { super(message, 404, "not_found"); } }
export class ValidationError extends AppError { constructor(message = "Revisa los datos enviados.", details) { super(message, 400, "validation_error"); this.details = details; } }
export class ConflictError extends AppError { constructor(message = "El recurso ya existe.") { super(message, 409, "conflict"); } }

export function apiError(error) {
  if (error instanceof AppError) return Response.json({ error: error.message, code: error.code, details: error.details }, { status: error.status });
  console.error("Server operation failed", error instanceof Error ? error.message : "Unknown error");
  return Response.json({ error: "Ocurrió un error interno. Intenta nuevamente." }, { status: 500 });
}
