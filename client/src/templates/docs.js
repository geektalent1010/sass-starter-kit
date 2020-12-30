import React from 'react';
import { graphql } from 'gatsby';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Docs = ({ data }) => {
  console.log(data);
  const htmlCode = data.prismicDocs.data.body[2].primary.quote.html;
  const htmlText = data.prismicDocs.data.body[2].primary.quote.text;

  return (
    <React.Fragment>
      {/*<h1>{data.title.text}</h1>*/}
      <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
      <code>{htmlText}</code>
      <div style={{ width: '80%', borderRadius: '3rem' }}>
        <SyntaxHighlighter language="javascript" style={dark}>
          {htmlText}
        </SyntaxHighlighter>
      </div>
    </React.Fragment>
  );
};

export default Docs;

export const pageQuery = graphql`
  query DocsBySlug($uid: String!) {
    prismicDocs(uid: { eq: $uid }) {
      uid
      data {
        author {
          link_type
        }
        body {
          ... on PrismicDocsBodyCodeSnippet {
            id
            primary {
              quote {
                text
                html
              }
            }
          }
        }
      }
    }
  }
`;
