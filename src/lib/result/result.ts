/**
 * Result pattern for handling success/failure in use cases
 * Ensures no exceptions bubble up to the UI layer
 */

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: { code: string; message: string } }

/**
 * Creates a successful result
 */
export function success<T>(data: T): Result<T> {
  return { success: true, data }
}

/**
 * Creates a failure result
 */
export function failure(code: string, message: string): Result<never> {
  return { success: false, error: { code, message } }
}