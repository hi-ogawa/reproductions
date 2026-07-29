'use server'

export async function outerAction(action: () => Promise<string>) {
  return `OUTER_OK(${await action()})`
}
