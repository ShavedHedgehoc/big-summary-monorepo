interface Row {
  productid: string;
  productname: string;
  quantity: string;
}

interface Attributes {
  apparatus: string;
  batch: string;
  date: string;
  fin_productid: string;
  marking: string;
  plan: string;
  plant: string;
}

interface BatchRecord {
  _attributes: Attributes;
  row: Row[];
}

interface Document {
  batch_record: BatchRecord;
}

export class UploadBoilDto {
  readonly document!: Document;
}
