export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    const evento = await prisma.evento.findUnique({
        where: { id: Number(id) },
        include: { personas: true }
    })

    if (!evento) {
        throw createError({ statusCode: 404, message: 'Evento no encontrado.'})
    }

    return evento
})