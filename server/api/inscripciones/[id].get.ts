export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    return await prisma.persona.findMany({
        where: { eventoId: Number(id) },
        orderBy: { id: 'asc'}

    })

})