import { Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { Task } from './TaskManager';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

export const TaskList = ({ tasks, onToggleTask, onDeleteTask }: TaskListProps) => {
  return (
    <div className="space-y-2">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className={cn(
            "flex items-center gap-3 p-4 rounded-lg border bg-card transition-all duration-200 hover:shadow-soft animate-fade-in",
            task.completed ? "bg-accent/5 border-accent/20" : "border-border"
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleTask(task.id)}
            className={cn(
              "transition-all duration-200",
              task.completed && "animate-task-complete"
            )}
          />
          
          <span
            className={cn(
              "flex-1 text-left transition-all duration-200",
              task.completed
                ? "line-through text-task-complete font-medium"
                : "text-foreground"
            )}
          >
            {task.title}
          </span>
          
          {task.completed && (
            <div className="flex items-center text-task-complete text-sm font-medium">
              <Check className="h-4 w-4 mr-1" />
              Done
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteTask(task.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};