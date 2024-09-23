export default function Heading({ title }: { title: string }) {
  return (
    <div className="sub-heading d-flex justify-content-center align-items-center gap-2 my-4">
      <hr className="col-1" />
      <h1 className="display-2 fw-bold text-center">{title}</h1>
      <hr className="col-1" />
    </div>
  );
}
