export default interface ProjectStatus {
  readonly Active: ProjectStatus;
  readonly Done: ProjectStatus;
  readonly Dropped: ProjectStatus;
  readonly OnHold: ProjectStatus;
  readonly all: ProjectStatus[];
}
