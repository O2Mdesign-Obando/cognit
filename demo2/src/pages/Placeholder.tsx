import { Hammer } from "lucide-react";
import { Card, Badge } from "../components/ui";

export default function Placeholder({ title, note }: { title: string; note?: string }) {
  return (
    <div className="animate-fade-up">
      <Card className="flex flex-col items-center justify-center gap-4 px-8 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cool-100 text-navy">
          <Hammer size={24} />
        </span>
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight text-navy">{title}</h1>
          <p className="mt-2 max-w-md text-cool-600">
            {note ?? "This screen is part of the Cognit Learning Hub demo and is scheduled for the next build phase."}
          </p>
        </div>
        <Badge tone="blue">Coming in next build phase</Badge>
      </Card>
    </div>
  );
}
