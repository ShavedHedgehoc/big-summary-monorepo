// interface IDocRow {
//   id: number;
//   productId: number;
//   product: string;
//   boil: string;
//   plan: number;
//   apparatus: string;
//   bbf: string;
//   note: string;
//   can: string;
//   conveyor: string;
//   workshop: string;
//   historiesCount: number;
//   state: string;
//   stateValue: string;
//   isSet: boolean;
// }

// interface SummaryResponse {
//   id: number;
//   plantId: number;
//   plant: string;
//   date: Date;
//   createdAt: Date;
//   updatedAt: Date;
//   records: IDocRow[];
// }

//////////
// interface IDoc {
//   id: number;
//   date: Date;
//   recordsCount: number;
//   historiesCount: number;
//   plant: string;
// }

// interface IRecordDetailRecord {
//   id: number;
//   date: Date;
//   plant: string;
//   product: string;
//   boil: string;
//   conveyor: string;
// }

// interface IBoilFilter {
//   baseCode: string;
//   boil: string;
// }

// interface IBoilParams {
//   filter: IBoilFilter;
//   limit: number;
//   page: number;
// }

//////////////
export interface IPlant {
  id: number;
  value: string;
  abb: string;
}

// interface ISerie {
//   id: number;
//   value: string;
// }

// interface IBoil {
//   id: number;
//   value: string;
// }

// interface IApparatus {
//   id: number;
//   value: string;
// }
// interface ICan {
//   id: number;
//   value: string;
// }

// interface IConveyor {
//   id: number;
//   value: string;
// }
// interface IWorkshop {
//   id: number;
//   value: string;
// }

// interface IProduct {
//   id: number;
//   code1C: string;
//   marking: string;
//   name: string | null;
//   serieId: number;
//   createdAt: Date;
//   updatedAt: Date;
//   serie: ISerie;
// }

interface IHistoryType {
  id: number;
  value: string;
  description: string;
}

interface IUser {
  id: number;
  name: string;
}

interface IEmployee {
  id: number;
  name: string;
  barcode: string;
  occupation: IOccupation;
}

interface IOccupation {
  id: number;
  value: string;
  description: string;
}

export interface IHistory {
  id: number;

  record_id: number;
  boil_id: number;
  historyTypeId: number;
  userId: number;
  employeeId: number;
  note: string;
  createdAt: Date;
  updatedAt: Date;
  historyType: IHistoryType;
  user: IUser | null;
  employee: IEmployee | null;
  note_id: number;
}

// interface IRole {
//   id: number;
//   value: string;
//   description: string;
// }

// interface IUserRow {
//   id: number;
//   name: string;
//   email: string;
//   banned: boolean;
//   roles: string[];
// }

// interface IRecord {
//   doc: IDoc;
//   id: number;
//   productId: number;
//   plan: number;
//   bbf: string;
//   note: string;
//   historiesCount: number;
//   state: string;
//   stateValue: string;
//   docId: number;
//   doc_id: number;
//   boilId: number;
//   apparatusId: number;
//   canId: number;
//   conveyorId: number;
//   workshopId: number;
//   createdAt: Date;
//   updatedAt: Date;
//   product: IProduct;
//   boil: IBoil;
//   apparatus: IApparatus;
//   can: ICan;
//   conveyor: IConveyor;
//   workshop: IWorkshop;
//   histories: IHistory[] | [];
// }

// interface ISummary {
//   code1C: string;
//   product: string;
//   serie: string;
//   batch: string;
//   apparatus: string;
//   can: string;
//   plan: string;
//   bbf: string;
//   note: string;
//   workshop: string;
//   boil1: string;
//   boil2: string;
// }

// interface ISummaryUploadData {
//   plantId: string;
//   summaryDate: string;
//   rows: ISummary[];
// }

// interface IXLSData {
//   code1C: string;
//   product: string;
//   serie: string;
//   batch: string;
//   apparatus: string;
//   can: string;
//   plan: string;
//   bbf: string;
//   note: string;
//   workshop: string;
//   boil1: string;
//   boil2: string;
// }

// interface IBoilsListItem {
//   id: number;
//   value: string;
//   recordsCount: number;
//   historiesCount: number;
//   state: string;
//   stateValue: string;
//   base_code: string;
//   base_marking: string;
// }
