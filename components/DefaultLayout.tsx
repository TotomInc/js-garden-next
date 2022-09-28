export const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="min-h-screen">{children}</div>;
};
