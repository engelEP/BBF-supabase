export default function Header(props: { title: string }) {
  return (
    <header className="flex flex-col gap-16 items-center">
      <h1 className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        {props.title}
      </h1>
    </header>
  );
}
