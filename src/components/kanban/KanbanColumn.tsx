
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  title: string;
  color: string;
  count: number;
  children: React.ReactNode;
}

export const KanbanColumn = ({ title, color, count, children }: KanbanColumnProps) => {
  return (
    <div className="w-80 flex-shrink-0">
      <div className={cn("rounded-t-lg p-3", color)}>
        <h3 className="font-semibold text-gray-800 text-sm">
          {title} ({count})
        </h3>
      </div>
      <Card className="min-h-96 p-3 space-y-3 rounded-t-none border-t-0">
        {children}
      </Card>
    </div>
  );
};
