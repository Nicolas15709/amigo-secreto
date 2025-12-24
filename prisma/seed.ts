import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Borrando respuestas anteriores…");
  await prisma.answer.deleteMany();
  
  console.log("Borrando preguntas anteriores…");
  await prisma.question.deleteMany();

  console.log("Insertando preguntas nuevas…");

  await prisma.question.createMany({
    data: [
      {
        text: "¿Qué actividad disfruta más para despejar la mente?",
        options: ["🏃‍♂️ Running", "🛋️ Ver series", "🎮 Jugar videojuegos", "🍻 Salir a tomar algo"],
        correct: "🏃‍♂️ Running",
        order: 1,
      },
      {
        text: "¿Cómo suele verse cuando sale de trabajar?",
        options: ["👔 Formal y bien arreglado", "😎 Casual pero elegante", "🧢 Deportivo", "👕 Muy relajado"],
        correct: "👔 Formal y bien arreglado",
        order: 2,
      },
      {
        text: "¿En qué tipo de lugar pasa la mayor parte de su semana?",
        options: ["🏦 En un banco", "🏫 En una universidad", "🏠 Trabajando desde casa", "🏢 En una startup"],
        correct: "🏦 En un banco",
        order: 3,
      },
      {
        text: "¿Qué parte de su rutina cuida más últimamente?",
        options: ["💪 Entrenar en el gym", "🏃‍♂️ Correr con constancia", "🥗 Comer saludable", "😴 Dormir temprano"],
        correct: "💪 Entrenar en el gym",
        order: 4,
      },
      {
        text: "Los fines de semana casi siempre los pasa…",
        options: ["👩‍❤️‍👨 Con su novia", "👨‍👩‍👧‍👦 Con su familia", "🎉 Con amigos", "🏖️ Viajando"],
        correct: "👩‍❤️‍👨 Con su novia",
        order: 5,
      },
      {
        text: "Si tiene un rato libre un domingo, lo más probable es que…",
        options: ["🏃‍♂️ Salga a correr", "☕ Vaya por un café", "🎬 Vea una película", "🛌 Se quede descansando"],
        correct: "🏃‍♂️ Salga a correr",
        order: 6,
      },
      {
        text: "¿Qué rasgo físico se le nota más a simple vista?",
        options: ["🧔 Barba", "🧔‍♂️ Cabello", "🧍‍♂️ Estatura", "😎 Su forma de vestir"],
        correct: "🧔 Barba",
        order: 7,
      },
      {
        text: "¿Qué lo motiva más a entrenar?",
        options: ["🧠 Salud y bienestar", "💪 Verse más grande", "🏆 Competir", "📸 Redes sociales"],
        correct: "🧠 Salud y bienestar",
        order: 8,
      },
      {
        text: "En una reunión social, él suele ser…",
        options: ["😄 Conversón", "🤐 Muy reservado", "🎤 El alma de la fiesta", "📱 Siempre en el celular"],
        correct: "😄 Conversón",
        order: 9,
      },
      {
        text: "¿Qué tipo de plan prefiere con su novia?",
        options: ["🍽️ Salir a comer", "🏃‍♂️ Actividades al aire libre", "🎬 Ver películas", "✈️ Viajar"],
        correct: "🍽️ Salir a comer",
        order: 10,
      },
      {
        text: "¿Qué superhéroe cree que es el mejor?",
        options: ["🦇 Batman", "🕷️ Spiderman", "🦸‍♂️ Superman", "🛡️ Capitán América"],
        correct: "🦸‍♂️ Superman",
        order: 11,
      },
      {
        text: "¿En qué momento es más probable que se ponga a cantar?",
        options: ["🚗 Cuando va manejando solo", "🚿 Mientras se baña", "🎧 Cuando escucha música con audífonos", "🎉 Solo en reuniones con amigos"],
        correct: "🚗 Cuando va manejando solo",
        order: 12,
      },
    ],
  });

  console.log("✔ Seed completado con éxito.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });