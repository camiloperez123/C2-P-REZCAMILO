export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { nombre, apellido, eventoId } = body

    if (!eventoId || !nombre || !apellido) {
        throw createError({ statusCode: 400, message: 'Datos incompletos de la inscripción' })
    }

    return await prisma.persona.create({
        data: { nombre, apellido, eventoId: Number(eventoId) }
    })
})