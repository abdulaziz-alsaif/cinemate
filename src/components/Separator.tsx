function Separator({ className }: {className?: string}) {
  return <span className={`text-4xl leading-[0] ${className}`}>&middot;</span>;
}

export default Separator;
