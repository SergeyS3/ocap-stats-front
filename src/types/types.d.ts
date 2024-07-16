type PickByType<T, Value> = {
  [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P]
}

type DateConstructorParam = ConstructorParameters<typeof Date>[0]

type DurationIso8601 = `P${string}`
