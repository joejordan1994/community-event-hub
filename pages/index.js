import { useState, useEffect } from "react";

export default function Home() {
  const STORAGE_KEY = "communityEvents";
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setEvents(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.eventName.value.trim();
    const date = e.target.eventDate.value;
    if (!name || !date) return;
    setEvents((prev) => [...prev, { name, date }]);
    e.target.reset();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>CommunityEventHub</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
        <input
          name="eventName"
          placeholder="Event Name"
          required
          style={{ padding: ".5rem", marginRight: ".5rem" }}
        />
        <input
          type="date"
          name="eventDate"
          required
          style={{ padding: ".5rem", marginRight: ".5rem" }}
        />
        <button type="submit" style={{ padding: ".5rem" }}>
          Create Event
        </button>
        <button
          type="button"
          onClick={() => {
            setEvents([]);
            localStorage.removeItem(STORAGE_KEY);
          }}
          style={{ padding: ".5rem", marginLeft: ".5rem" }}
        >
          Clear All Events
        </button>
      </form>
      <ul>
        {events.map((ev, i) => (
          <li key={i}>
            {ev.date} – {ev.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
