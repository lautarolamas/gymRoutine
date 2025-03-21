# Gym Routine

Una aplicación web para gestionar rutinas de gimnasio, permitiendo crear y seguir rutinas personalizadas, registrar pesos y hacer seguimiento del progreso.

## Características

- 🏋️‍♂️ Creación y gestión de rutinas de ejercicios
- 📊 Registro y seguimiento de peso
- 🌓 Modo claro/oscuro
- 📱 Diseño responsive
- 🔐 Autenticación de usuarios
- 💾 Persistencia de datos con Supabase

## Tecnologías Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- Shadcn/ui
- Sonner (notificaciones)

## Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- Cuenta en Supabase

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/gym-routine.git
cd gym-routine
```

2. Instala las dependencias:

```bash
npm install
# o
yarn install
```

3. Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
NEXT_PUBLIC_CAFECITO_USERNAME=tu_usuario_de_cafecito
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
gym-routine/
├── app/                    # Páginas y rutas de la aplicación
├── components/            # Componentes reutilizables
├── contexts/             # Contextos de React
├── lib/                  # Utilidades y configuraciones
├── public/              # Archivos estáticos
└── types/               # Definiciones de tipos TypeScript
```

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
