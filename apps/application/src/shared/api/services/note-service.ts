import { $api } from '../http';

/** @public */
export interface NoteResponse {
  id: number;
  value: string;
}

export default class NoteService {
  static getNoteById = async (noteId: number): Promise<NoteResponse> => {
    const res = await $api.get<NoteResponse>(`/notes/${noteId}`);
    return res.data;
  };
}
