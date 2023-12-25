import { parseHTML } from "k6/html";

export function getAngularDepReqs(res) {
  let requests = []
  const regex = /(Angular.+)/;
  let links = res.find('link[rel="stylesheet"], script[defer]').toArray().map((tag) => {
    let href = tag.attr('href');
    let src = tag.attr('src');
    if (href && regex.test(href)) {
      requests.push(href);
    }
    else if (src) {
      requests.push(src);
    }
  });

  return requests
}
