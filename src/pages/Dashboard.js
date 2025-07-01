export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold">👋 Welcome, {user?.name || "Guest"}!</h2>
    </div>
  );
}
