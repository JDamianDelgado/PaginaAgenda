import { motion } from "framer-motion";
import { useState } from "react";

interface Plan {
  id: string;
  nombre: string;
  imagen: string;
  precio: number;
  precioOferta: number;
  periodo: string;
  tagline: string;
  cta: string;
  beneficios: string[];
}

export function PlanCard({ plan }: { plan: Plan }) {
  const [rotar, setRotar] = useState(false);

  return (
    <section className="contenedorPlanes">
      <div onClick={() => setRotar((rot) => !rot)} className="cardPlanes">
        {!rotar ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            key="front"
            className="cardFrente"
          >
            <h3>{plan.nombre}</h3>
            <img src={plan.imagen} alt={plan.nombre} />
            <p>{plan.tagline}</p>
            <small>{plan.periodo}</small>
            <button>Ver precios</button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            key="back"
            className="cardTrasera"
          >
            <ul>
              <p>Incluye:</p>
              {plan.beneficios.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <h1>${plan.precioOferta}</h1>
            <button>Quiero mas informacion</button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
