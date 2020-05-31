export default interface TaskStatus {
  readonly Available: TaskStatus;
  readonly Blocked: TaskStatus;
  readonly Completed: TaskStatus;
  readonly Dropped: TaskStatus;
  readonly DueSoon: TaskStatus;
  readonly Next: TaskStatus;
  readonly Overdue: TaskStatus;
  readonly all: TaskStatus[];
}
