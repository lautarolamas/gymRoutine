export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-6">
          Última actualización: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Información que Recopilamos
          </h2>
          <p>
            Recopilamos la siguiente información cuando utiliza Gym Routine:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Información de la cuenta (email, contraseña)</li>
            <li>Datos de perfil (si los proporciona)</li>
            <li>Rutinas de ejercicio creadas</li>
            <li>Registros de peso</li>
            <li>Datos de uso de la aplicación</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Uso de la Información
          </h2>
          <p>Utilizamos la información recopilada para:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Proporcionar y mantener el servicio</li>
            <li>Mejorar y personalizar su experiencia</li>
            <li>Procesar sus transacciones</li>
            <li>Enviar notificaciones importantes</li>
            <li>Prevenir actividades fraudulentas</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Almacenamiento de Datos
          </h2>
          <p>
            Utilizamos Supabase para almacenar sus datos de forma segura. Sus
            datos están protegidos con medidas de seguridad estándar de la
            industria, incluyendo:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Encriptación de datos en tránsito y en reposo</li>
            <li>Autenticación segura</li>
            <li>Copias de seguridad regulares</li>
            <li>Control de acceso basado en roles</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Compartir Información
          </h2>
          <p>
            No vendemos ni compartimos su información personal con terceros,
            excepto cuando:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Es necesario para proporcionar el servicio</li>
            <li>Lo requiere la ley</li>
            <li>Usted da su consentimiento explícito</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Sus Derechos</h2>
          <p>Usted tiene derecho a:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Acceder a sus datos personales</li>
            <li>Corregir datos inexactos</li>
            <li>Solicitar la eliminación de sus datos</li>
            <li>Oponerse al procesamiento de sus datos</li>
            <li>Exportar sus datos</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
          <p>
            Utilizamos cookies y tecnologías similares para mejorar su
            experiencia en la aplicación. Puede controlar el uso de cookies a
            través de la configuración de su navegador.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Cambios en la Política
          </h2>
          <p>
            Nos reservamos el derecho de modificar esta política de privacidad
            en cualquier momento. Le notificaremos sobre cualquier cambio
            significativo a través de la aplicación o por correo electrónico.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contacto</h2>
          <p>
            Si tiene alguna pregunta sobre esta política de privacidad, por
            favor contáctenos.
          </p>
        </section>
      </div>
    </div>
  );
}
