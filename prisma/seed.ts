import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Borrando preguntas anteriores…");
  await prisma.question.deleteMany();

  console.log("Insertando preguntas nuevas…");

  await prisma.question.createMany({
    data: [
      {
        text: "¿Crees que esta persona prefiere playa o montaña para descansar?",
        options: ["Playa", "Montaña", "Ciudad", "Camping"],
        correct: "Playa",
        order: 1,
      },
      {
        text: "¿Qué comida sospechás que le vuelve loco?",
        options: ["Pizza", "Sushi", "Asado", "Hamburguesa"],
        correct: "Asado",
        order: 2,
      },
      {
        text: "¿Le gusta más bailar reggaetón o rock?",
        options: ["Reggaetón", "Rock", "Salsa", "Ninguno"],
        correct: "Rock",
        order: 3,
      },
      {
        text: "¿Qué película creés que ve de memoria?",
        options: ["El Padrino", "Avengers", "Forrest Gump", "Harry Potter"],
        correct: "Forrest Gump",
        order: 4,
      },
      {
        text: "¿Animal de compañía que tendría?",
        options: ["Perro", "Gato", "Pez", "Ninguno"],
        correct: "Perro",
        order: 5,
      },
      {
        text: "¿Qué cree que es el mejor superhéroe?",
        options: ["Batman", "Spiderman", "Iron Man", "Superman"],
        correct: "Batman",
        order: 6,
      },
      {
        text: "¿A qué hora sospechás que se levanta los domingos?",
        options: ["Antes de 10", "Entre 10 y 12", "Después de 12", "No duerme"],
        correct: "Antes de 10",
        order: 7,
      },
      {
        text: "¿Qué le regalarías por su cumple?",
        options: ["Ropa", "Libro", "Videojuego", "Algo para cocinar"],
        correct: "Videojuego",
        order: 8,
      },
      {
        text: "¿Bebida típica en su heladera?",
        options: ["Cerveza", "Coca Cola", "Fernet", "Agua"],
        correct: "Cerveza",
        order: 9,
      },
      {
        text: "¿Color que más usa en su ropa?",
        options: ["Negro", "Azul", "Verde", "Blanco"],
        correct: "Negro",
        order: 10,
      },
      {
        text: "¿Qué le gusta hacer cuando está solo/a?",
        options: ["Ver series", "Salir con amigos", "Leer", "Cocinar"],
        correct: "Ver series",
        order: 11,
      },
      {
        text: "¿Piensa que el amor entra por los ojos o por el corazón?",
        options: ["Ojos", "Corazón", "Ambos", "Ninguno"],
        correct: "Corazón",
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
