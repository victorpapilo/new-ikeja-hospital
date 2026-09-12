export default function LocationMap() {
  return (
    <div className="overflow-hidden rounded-2xl shadow-soft h-80 w-full">
      <iframe
        title="New Ikeja Hospital location"
        src="https://www.google.com/maps?q=6.603687,3.3470765&z=16&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
