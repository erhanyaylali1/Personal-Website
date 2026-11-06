/** Unknown /api/… endpoints answer like an API: a JSON 404 rather than an HTML page. */
const notFound = () => Response.json({ error: "Not found" }, { status: 404 });

export { notFound as GET, notFound as POST, notFound as PUT, notFound as PATCH, notFound as DELETE };
