// Auth module public API
// Export hooks, components, and types that other modules can use

export * from './presentation/hooks/use-auth'
export * from './presentation/components'

// Export domain types that might be shared
export type { User } from './domain/entities/user.entity'
export type { SignupInput, LoginInput } from './domain/usecases/auth.contracts'