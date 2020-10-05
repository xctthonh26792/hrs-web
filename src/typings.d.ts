/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface FetchResult {
  count: number;
  models: Array<any>;
}

interface FetchParams {
  [key: string]: string;
  sortby?: string;
  sortdirection?: string;
}

interface OnCloseEvent extends Event {
  code: string
  reason: string
}

interface OnMessageEvent extends Event {
  data: string
}

interface FetchQuery {
  params?: {
    sort_name?: string
    sort_direction?: string,
    keyword?: string
  }
  filters?: {
    [key: string]: {
      n: string,
      c: '$in' | '>' | '>=' | '<' | '<=' | '==' | '^' | '$' | '//' | '!=' | '[]',
      v: string | number | Array<any> | { f: string | number, t: string | number }
    }
  }
} 