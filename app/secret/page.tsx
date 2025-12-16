export default function Secret() {
  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Mi Amigo Secreto es…</h1>

      <img
        src="/amigo-secreto.jpg"
        className="rounded-xl shadow-lg w-64 mb-4"
      />

      <h2 className="text-2xl font-semibold">Nombre de tu amigo secreto</h2>
    </div>
  );
}
