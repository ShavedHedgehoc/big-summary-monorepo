import { $api } from '../http';

export default class DocumentService {
  static getDocumentsListWithParams = async (dto: FetchDocumentsDto): Promise<IDocumentData> => {
    const res = await $api.post<IDocumentData>(`/docs/get_all`, dto);
    return res.data;
  };
  static deleteDocument = async (document_id: number): Promise<any> => {
    const res = await $api.delete<any>(`/docs/${document_id}`);
    return res.data;
  };

  static getDocumentById = async (document_id: string | undefined): Promise<IDocument> => {
    const res = await $api.get<IDocument>(`/docs/${document_id}`);
    return res.data;
  };
}
