'use server'

export async function fecthCards({
  page = 1,
  search
}: { page?: number, search?: string | undefined }) {
  const { cards } = await getCards({ query: search, page })
  return cards;
}
