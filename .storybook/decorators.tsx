import React from "react";
import NoteProvider from "../src/app/home/notes/[noteId]/NoteProvider";
import { DecoratorFunction } from "storybook/internal/types";

export type ArgsWithId = {
  noteId?: string;
  dashboardId?: string;
  widgetId?: string;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withNoteProvider: DecoratorFunction<any, any> = (Story, context) => {
  const noteId = context.args?.noteId ?? "demo-note";
  return <NoteProvider noteId={noteId}>{Story(context)}</NoteProvider>;
};
