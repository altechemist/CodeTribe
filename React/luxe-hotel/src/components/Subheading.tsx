export default function Heading({ title }: { title: string }) {
  return (
    <div className="sub-heading d-flex justify-content-center align-items-center gap-2 my-4">
      <h2 className="display-6 fw-bold text-center">{title}</h2>
    </div>
  );
}
