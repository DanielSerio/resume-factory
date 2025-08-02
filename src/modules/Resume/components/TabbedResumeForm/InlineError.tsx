export const InlineError = ({ message }: { message: string }) => {
  return (
    <small
      className="text-xs text-destructive max-w-full overflow-x-hidden verflow-ellipsis"
      title={message}
    >
      {message}
    </small>
  );
};
