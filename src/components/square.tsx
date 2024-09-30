import { cn } from "@/lib/utils";

type SquareProps = {
  value: string;
  onClick: () => void;
  className?: string;
};

export function Square({ value, onClick, className }: SquareProps) {
  return (
    <div
      className={cn(
        "flex h-[105px] w-[88.66px] flex-col gap-4 bg-white/10 p-4 text-white hover:bg-white/20",
        className,
      )}
      onClick={onClick}
    >
      <h3 className="text-7xl font-bold">{value}</h3>
    </div>
  );
}
