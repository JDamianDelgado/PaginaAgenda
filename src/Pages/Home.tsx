import {
  carruselServiciosMock,
  historiaPacientesMock,
  NuestrosServiciosMock,
} from "../Mock/NuestrosServiciosMock";
import { FaCalendarAlt, FaComments, FaFileSignature } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Home() {
  //carrusel presentacion
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % carruselServiciosMock.length);
    }, 3000);
    return () => clearInterval(intervalo);
  });
  const serviceCarrusel = carruselServiciosMock[index];
  //

  //carrusel opiniones
  const [indexOpinion, setIndexOpinion] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndexOpinion((prev) => (prev + 1) % historiaPacientesMock.length);
    }, 4000);

    return () => clearInterval(intervalo);
  }, []);

  const serviceHistory = historiaPacientesMock[indexOpinion];
  //
  return (
    <div className="contenedorHome">
      <section className="carruselServicios">
        <img
          src="https://plus.unsplash.com/premium_photo-1701815883025-3e4faab6eec8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="PresentacionItem"
          >
            <h2>{serviceCarrusel.titulo}</h2>
            <p>{serviceCarrusel.descripcion}</p>
          </motion.div>
        </AnimatePresence>
      </section>

      <section id="NuestosServicios" className="contenedorNuestrosServicios">
        <h2>Nuestros Servicios</h2>
        <div className="nuestrosServicios">
          {NuestrosServiciosMock.map((serv, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              className="Cardserv"
              key={index}
            >
              <img src={serv.imagen} alt={serv.servicio} />
              <div className="cardServTexto">
                <h2>{serv.servicio}</h2>
                {serv.profesional && <h3>{serv.profesional}</h3>}
                <p>{serv.descripcion}</p>
              </div>
              <button className="buttonShadow">Conocer mas</button>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="contenedorProceso">
        <h1>Nuestro proceso</h1>

        <motion.section
          id="Proceso"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="proceso"
        >
          <img src="./public/logo.png" alt="Proceso" />
          <div className="ProcesoText">
            <ul>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="itemProceso"
              >
                <FaComments size={40} />
                <p>
                  Si algo de lo que leíste resonó contigo, no tienes que poder
                  con todo sola(o). En Power of Mind encontrarás un espacio
                  seguro para escuchar tus emociones y comenzar tu proceso de
                  acompañamiento psicoterapéutico.
                </p>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                className="itemProceso"
              >
                <FaFileSignature size={40} />
                <p>
                  Iniciar un Chat Si algo de lo que leíste resonó contigo, no
                  tienes que poder con todo sola(o). En Power of Mind
                  encontrarás un espacio seguro para escuchar tus emociones y
                  comenzar tu proceso de acompañamiento psicoterapéutico. Elegir
                  un Plan Cada proceso terapéutico es único. Por eso, en Power
                  of Mind puedes elegir el plan que mejor se adapte a tus
                  necesidades, ritmo y momento de vida, ya sea terapia
                  individual o acompañamiento a través de talleres. Si tienes
                  dudas, con gusto puedo orientarte para encontrar la opción más
                  adecuada para ti.
                </p>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 }}
                className="itemProceso"
              >
                <FaCalendarAlt size={40} />
                <p>
                  Dar el primer paso también es una forma de cuidarte. Reserva
                  tu sesión y comienza a escuchar lo que hoy necesitas.
                </p>
              </motion.li>
            </ul>
          </div>
        </motion.section>
        <button className="buttonShadow">Planes y reservas</button>
      </section>

      <section className="opiniones ">
        <h1>Opinion de pacientes</h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={indexOpinion}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="opinionItem"
          >
            <section className="textoOpinion">
              <p>{serviceHistory.descripcion}</p>
              <span>
                {serviceHistory.nombre} - {serviceHistory.edad}
              </span>
            </section>
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
