export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-headline font-bold mb-2">Admin Tools</h1>
        <p className="text-muted-foreground mb-8">Manage your application and leverage AI features.</p>
        {children}
      </div>
    );
  }
  