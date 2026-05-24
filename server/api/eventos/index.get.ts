export default defineEventHandler(async () => {
  return await prisma.evento.findMany({
    include: { personas: true },
    orderBy: { fecha: 'asc'}
  })
})