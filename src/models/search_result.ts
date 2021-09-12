/**
 * 用于确定正在处理的搜索结果的位置，包含分页，每页的数量等信息, 用于 `SearchResult`
 * 
 * @example
 * 使用 SearchResultPosition 的 demo
 * ```typescript
 * // 偏移 20 条数据，每一批数据有 10 条
 * const position: SearchResultPosition = {
 *    limit: 10,
 *    offset: 20,
 * }
 * ``` 
 * @see SearchResult
 */
export interface SearchResultPosition {
  /**
   * 每页拥有的数据量
   */
  limit: number;

  /**
   * 结果偏移量
   */
  offset: number;
}

/**
 * 请求数据的函数类型，用于 `SearchResult`
 * @see SearchResult
 */
export type FetchResultFunc<SearchOptions, Result> = (
  options: SearchOptions,
  position: SearchResultPosition
) => Promise<Result | undefined>;

/**
 * 搜索结果处理类，支持分页等操作
 */
export class SearchResult<SearchOptions, Result> {
  private static readonly DEFAULT_LIMIT = 20;

  constructor(
    private searchOptions: SearchOptions,
    private fetchFunc: FetchResultFunc<SearchOptions, Result>,
    private position: SearchResultPosition = {
      limit: SearchResult.DEFAULT_LIMIT,
      offset: 0,
    }
  ) {}

  /**
   * 重新定义 limit
   * @param limit 新的 limit
   * @see SearchResultPosition
   */
  public limit(limit: number): this {
    this.position.limit = limit;
    return this;
  }

  /**
   * 重新定义 offset
   * @param offset 新的 offset
   * @see SearchResultPosition
   */
  public offset(offset: number): this {
    this.position.offset = offset;
    return this;
  }

  /**
   * 异步地请求下一批数据
   */
  public async nextPage(): Promise<Result | undefined> {
    const result = await this.fetchFunc(this.searchOptions, this.position);
    this.position.offset += this.position.limit;
    return result;
  } 
}
