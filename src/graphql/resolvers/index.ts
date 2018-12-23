import * as path from "path";

import getFilename from "../../utils/filename";
import parseDirectory from "../../utils/parseDirectory";

export default new Promise((response, reject) => {
  const basename = path.basename(module.filename);
  const queryPromises = [];
  const mutationPromises = [];

  parseDirectory(basename, `${__dirname}/query`).forEach((file) => {
    const filename = getFilename(file);
    const dyn = import(`./query/${file}`).then((module) => {
      const result = {
        module: module.default,
        name: filename,
      };
      return result;
    });
    queryPromises.push(dyn);
  });

  parseDirectory(basename, `${__dirname}/mutation`).forEach((file) => {
    const filename = getFilename(file);
    const dyn = import(`./mutation/${file}`).then((module) => {
      const result = {
        module: module.default,
        name: filename,
      };
      return result;
    });
    mutationPromises.push(dyn);
  });

  return Promise.all(queryPromises)
    .then((res) =>
      res.reduce((acc, cur) => {
        acc[cur.name] = cur.module;
        return acc;
      }, {}))
    .then((queries) =>
      Promise.all(mutationPromises).then((mutationsRes) => {
        const mutations = mutationsRes.reduce((res, cur) => {
          res[cur.name] = cur.module;
          return res;
        }, {});
        const result = {
          Mutation: mutations,
          Query: queries,
        };
        response(result);
      }));
});
