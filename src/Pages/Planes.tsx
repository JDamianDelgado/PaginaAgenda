import { planesMock } from "../Mock/NuestrosServiciosMock";
import { PlanCard } from "../components/planCard";
export function Planes() {
  return (
    <div className="contenedorPlanes">
      <div className="planesPresentacion">
        <h1>Nuestros Planes</h1>
      </div>

      <section className="planesGrid">
        {planesMock.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </section>
    </div>
  );
}
