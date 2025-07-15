import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { FilterType } from './TaskManager';

interface TaskFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const TaskFilter = ({ filter, onFilterChange, taskCounts }: TaskFilterProps) => {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all },
    { key: 'active', label: 'Active', count: taskCounts.active },
    { key: 'completed', label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg">
      {filters.map(({ key, label, count }) => (
        <Button
          key={key}
          variant={filter === key ? "default" : "ghost"}
          onClick={() => onFilterChange(key)}
          className={cn(
            "flex-1 relative transition-all duration-200",
            filter === key
              ? "bg-gradient-primary text-primary-foreground shadow-soft"
              : "hover:bg-background"
          )}
        >
          <span className="mr-2">{label}</span>
          <Badge 
            variant="secondary" 
            className={cn(
              "ml-auto transition-colors",
              filter === key 
                ? "bg-primary-foreground/20 text-primary-foreground" 
                : "bg-muted-foreground/20 text-muted-foreground"
            )}
          >
            {count}
          </Badge>
        </Button>
      ))}
    </div>
  );
};