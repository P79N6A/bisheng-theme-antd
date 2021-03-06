const path = require('path');

const homeTmpl = './template/Home/index';
const contentTmpl = './template/Content/index';
// const redirectTmpl = './template/Redirect';
// const appShellTmpl = './template/AppShell';

// function pickerGenerator(module) {
//   const tester = new RegExp(`^docs/${module}`);
//   return markdownData => {
//     const { filename } = markdownData.meta;
//     if (tester.test(filename) && !/\/demo$/.test(path.dirname(filename))) {
//       return {
//         meta: markdownData.meta,
//       };
//     }
//     return null;
//   };
// }

module.exports = {
  // 加上这个，返回的 demo、index 就会变成懒加载函数
  lazyLoad(nodePath, nodeValue) {
    if (typeof nodeValue === 'string') {
      return true;
    }
    return nodePath.endsWith('/demo');
  },
  // 在 node 执行
  pick: {
    // 会在传给页面组件的 props 上增加 components 字段
    components(markdownData) {
      const { filename } = markdownData.meta;
      if (!/^components/.test(filename) || /[/\\]demo$/.test(path.dirname(filename))) {
        return null;
      }
      return {
        meta: markdownData.meta,
      };
    },
    // changelog(markdownData) {
    //   if (/CHANGELOG/.test(markdownData.meta.filename)) {
    //     return {
    //       meta: markdownData.meta,
    //     };
    //   }
    //   return null;
    // },
    // 'docs/pattern': pickerGenerator('pattern'),
    // 'docs/react': pickerGenerator('react'),
    // 'docs/resource': pickerGenerator('resource'),
    // 'docs/spec': pickerGenerator('spec'),
  },
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=2&keepElem',
    'bisheng-plugin-antd?injectProvider',
    'bisheng-plugin-react?lang=__react',
  ],
  routes: {
    path: '/',
    component: './template/Layout/index',
    indexRoute: { component: homeTmpl },
    childRoutes: [
      // {
      //   path: 'app-shell',
      //   component: appShellTmpl,
      // },
      {
        path: 'index-cn',
        component: homeTmpl,
      },
      // {
      //   path: 'docs/pattern/:children',
      //   component: redirectTmpl,
      // },
      {
        path: 'docs/react/:children',
        component: contentTmpl,
      },
      // {
      //   path: 'changelog',
      //   component: contentTmpl,
      // },
      // {
      //   path: 'changelog-cn',
      //   component: contentTmpl,
      // },
      {
        path: 'components/:children',
        component: contentTmpl,
      },
      // {
      //   path: 'docs/spec/feature',
      //   component: redirectTmpl,
      // },
      // {
      //   path: 'docs/spec/feature-cn',
      //   component: redirectTmpl,
      // },
      // {
      //   path: 'docs/spec/:children',
      //   component: contentTmpl,
      // },
      // {
      //   path: 'docs/resource/:children',
      //   component: redirectTmpl,
      // },
    ],
  },
};
