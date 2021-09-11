import { Response } from 'node-fetch';

export interface BaseResponsePack<Data> {
  readonly status: number;
  readonly rawBody: Response; // FIXME: 也许持有该对象不是很好的说～
  readonly data: Data;
}

export class ResponsePack<Data> implements BaseResponsePack<Data | undefined> {
  constructor(
    readonly status: number,
    readonly rawBody: Response,
    readonly data: Data | undefined
  ) {}
}

export class ListResponsePack<Element> implements BaseResponsePack<Array<Element>> {
  constructor(
    readonly status: number,
    readonly rawBody: Response,
    readonly data: Array<Element>
  ) {}
}