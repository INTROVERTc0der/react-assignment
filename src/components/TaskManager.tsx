import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskList } from './TaskList';
import { TaskFilter } from './TaskFilter';
import { useToast } from '@/hooks/use-toast';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';

export const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Complete the task manager project', completed: false },
    { id: 2, title: 'Review React documentation', completed: true },
    { id: 3, title: 'Plan next week\'s sprint', completed: false },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const { toast } = useToast();

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle.trim(),
        completed: false,
      };
      setTasks([newTask, ...tasks]);
      setNewTaskTitle('');
      toast({
        description: "Task added successfully!",
      });
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      description: "Task deleted successfully!",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto animate-slide-up">
        <Card className="shadow-medium border-0 bg-card">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Task Manager
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Stay organized and productive with your daily tasks
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Add Task Section */}
            <div className="flex gap-2">
              <Input
                placeholder="Add a new task..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-border focus:ring-primary"
              />
              <Button 
                onClick={addTask}
                className="bg-gradient-primary hover:opacity-90 transition-opacity shrink-0"
                disabled={!newTaskTitle.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Filter Section */}
            <TaskFilter 
              filter={filter}
              onFilterChange={setFilter}
              taskCounts={taskCounts}
            />

            {/* Task List */}
            <TaskList
              tasks={filteredTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />

            {/* Empty State */}
            {filteredTasks.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-lg">
                  {filter === 'completed' ? 'No completed tasks yet' :
                   filter === 'active' ? 'No active tasks' :
                   'No tasks yet. Add one above!'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};