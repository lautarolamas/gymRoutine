export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Términos y Condiciones</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-6">
          Última actualización: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Aceptación de los Términos
          </h2>
          <p>
            Al acceder y utilizar Gym Routine, usted acepta estar sujeto a estos
            términos y condiciones. Si no está de acuerdo con alguna parte de
            estos términos, no podrá acceder al servicio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Descripción del Servicio
          </h2>
          <p>
            Gym Routine es una aplicación web que permite a los usuarios
            gestionar sus rutinas de ejercicio y seguimiento de peso. El
            servicio incluye la creación, edición y seguimiento de rutinas de
            entrenamiento, así como el registro de peso corporal.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Cuenta de Usuario</h2>
          <p>
            Para utilizar el servicio, debe crear una cuenta. Usted es
            responsable de mantener la confidencialidad de su cuenta y
            contraseña. Debe notificarnos inmediatamente sobre cualquier uso no
            autorizado de su cuenta.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Uso del Servicio</h2>
          <p>
            Usted acepta utilizar el servicio solo para fines legales y de una
            manera que no infrinja los derechos de otros. No debe:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Violar cualquier ley o regulación aplicable</li>
            <li>Infringir los derechos de propiedad intelectual de otros</li>
            <li>Interferir con el funcionamiento del servicio</li>
            <li>Acceder a datos no autorizados</li>
            <li>Realizar actividades que puedan dañar el servicio</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Modificaciones del Servicio
          </h2>
          <p>
            Nos reservamos el derecho de modificar o descontinuar el servicio en
            cualquier momento, con o sin previo aviso. No seremos responsables
            ante usted ni ante terceros por cualquier modificación, suspensión o
            descontinuación del servicio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Limitación de Responsabilidad
          </h2>
          <p>
            El servicio se proporciona "tal cual" y "según esté disponible" sin
            garantías de ningún tipo, ya sean expresas o implícitas. No seremos
            responsables por ningún daño directo, indirecto, incidental,
            especial o consecuente que resulte del uso o la imposibilidad de
            usar el servicio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contacto</h2>
          <p>
            Si tiene alguna pregunta sobre estos términos y condiciones, por
            favor contáctenos.
          </p>
        </section>
      </div>
    </div>
  );
}
