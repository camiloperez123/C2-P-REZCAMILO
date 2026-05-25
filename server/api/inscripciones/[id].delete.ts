export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    return await prisma.persona.delete({
        where: { id: Number(id)}
    })
})