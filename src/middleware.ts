export { default } from "next-auth/middleware"

// Para proteger rutas más profundas: "/RUTA/:path*"

export const config = { matcher: ["/user-info"] }