export async function GET() {
  const res = await fetch("https://billions-api.nomadcoders.workers.dev/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return Response.json({ data });
}
