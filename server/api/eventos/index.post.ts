export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { nombre, fecha, lugar, valor, imagen } = body
  if (!nombre || !fecha || !lugar) {
    throw createError({ statusCode: 400, message: 'Datos incompletos' 
   })
  }
  
  return await prisma.evento.create({
    data: {
      nombre,
      fecha: new Date(fecha),
      lugar,
      valor: Number(valor ?? 0),
      imagen: imagen || null
    }
  })
})
