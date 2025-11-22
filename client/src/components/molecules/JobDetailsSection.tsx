"use client";

export default function JobDetailsSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <h3 className="text-gray-500 font-semibold mb-2">{title}</h3>
      <ul className="list-disc pl-5 space-y-1 text-gray-800">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
