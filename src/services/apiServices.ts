import { ILink, Link } from "../models/Link.model";

export default {
  crateLink(body: ILink) {
    const newUrl = new Link(body);
    return newUrl.save();
  },
  getLinkByGid(GID: string) {
    return Link.findOne({ GID }, { originalUrl: 1, user: 1 });
  },
};
