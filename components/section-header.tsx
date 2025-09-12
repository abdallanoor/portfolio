export default function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <div className="relative inline-block w-fit text-foreground">
        <h2 className="text-3xl font-light">{title}</h2>
        <div className="w-full">
          <svg
            className="w-full max-w-80 h-2 rtl:mt-2"
            viewBox="0 0 200 20"
            preserveAspectRatio="none"
          >
            <path
              d="M10,15 Q100,5 190,15"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <p className="mt-4 font-light opacity-80">{description}</p>
    </>
  );
}
