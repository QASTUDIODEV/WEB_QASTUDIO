const htmlContent: string = `
<div >
  <h1 >Example Domain</h1>
  <p>This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.</p>
  <p><a href="https://www.iana.org/domains/example">More information...</a></p>
</div>
`;

const initialContent: string = `<!DOCTYPE html>
<html>
<head>
      <style >
        body {
          background-color: #f0f0f2;
          margin: 0;
          padding: 0;
          font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        div {
          width: 600px;
          margin: 5em auto;
          padding: 2em;
          background-color: #fdfdff;
          border-radius: 0.5em;
          box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);
        }
        a:link, a:visited {
          color: #38488f;
          text-decoration: none;
        }
        .qa-highlighted-element {
          outline: 3px solid #ffeb3b;
          background-color: rgba(255, 235, 59, 0.2);
        }
        @media (max-width: 700px) {
          div {
            margin: 0 auto;
            width: auto;
          }
        }
          
      </style>
    </head>
<body>
  <div id="mountHere"></div>
</body>
</html>`;

export { htmlContent, initialContent };
