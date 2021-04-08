const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pages = await graphql(`
    {
      allPrismicPost {
        edges {
          node {
            id
            uid
          }
        }
      }
    }
  `);

  if (pages.errors) {
    reporter.panic(pages.errors);
  }

  const templatePost = path.resolve('src/templates/post.js');

  pages.data.allPrismicPost.edges.forEach((edge) => {
    createPage({
      path: `/blog/${edge.node.uid}`,
      component: templatePost,
      context: {
        uid: edge.node.uid
      }
    });
  });
};
