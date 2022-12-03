export interface ICustomModal {
  children: React.ReactNode;
  handleClose: Function;
  open: boolean;
  title: string;
}
interface IModal {
  handleClose: Function;
  open: boolean;
  currentProduct: any;
  refetchAfterClose: Function;
}
export type IAuthorModal = IModal;

export type IGenreModal = IModal;

export type IPublisherModal = IModal;

export interface IBookModal extends IModal {
  authors: any[];
  genres: any[];
  publishers: any[];
  findAuthor: Function;
  findGenre: Function;
  findPublisher: Function;
}

export interface IConfirmModal {
  open: boolean;
  handleClose: Function;
  handleConfirm: Function;
  contentHeader?: string;
  textContent?: string;
  confirmContent?: string;
  cancelContent?: string;
}
