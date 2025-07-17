import NoteProvider from "./NoteProvider";
import NoteEditorLayout from "./NoteEditorLayout";
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ noteId: string }>;
}) {
  const noteParams = await params;
  const { noteId } = noteParams
  return (
    <NoteProvider noteId={noteId}>
      <NoteEditorLayout>{children}</NoteEditorLayout>
    </NoteProvider>
  );
}
