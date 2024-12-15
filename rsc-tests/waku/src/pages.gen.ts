import type { PathsForPages, GetConfigResponse } from 'waku/router';

import type { getConfig as Index_getConfig } from './pages/index';

type Page = {
  DO_NOT_USE_pages:| {path: '/cjs'; render: 'dynamic'}
| {path: '/cjs2'; render: 'dynamic'}
| {path: '/context'; render: 'dynamic'}
| {path: '/context2'; render: 'dynamic'}
| {path: '/context3-client'; render: 'dynamic'}
| {path: '/context3'; render: 'dynamic'}
| ({path: '/'} & GetConfigResponse<typeof Index_getConfig>)
};

  declare module 'waku/router' {
    interface RouteConfig {
      paths: PathsForPages<Page>;
    }
    interface CreatePagesConfig {
      pages: Page;
    }
  }
  